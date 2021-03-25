"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFiles = void 0;
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const path_1 = require("path");
const base_1 = require("./utils/base");
const ROOT = process.cwd();
function _transformFiles(pattern) {
    glob_1.default(pattern, {}, (err, files) => {
        if (err) {
            console.error(err);
        }
        else {
            files && files.forEach(file => {
                const filename = path_1.relative(ROOT, file);
                fs_1.readFile(filename, (err, content) => {
                    if (content && base_1.isCjsFile(content.toString())) {
                        const str = content.toString();
                        const { code } = base_1.transformFileBase(str);
                        fs_1.createWriteStream(filename).write(code);
                    }
                });
            });
        }
    });
}
function transformFiles(paths) {
    if (Array.isArray(paths)) {
        paths.forEach(v => _transformFiles(v));
    }
    else {
        _transformFiles(paths);
    }
}
exports.transformFiles = transformFiles;
