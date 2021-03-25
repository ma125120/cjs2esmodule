"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWithRequire = exports.replaceWithRest = exports.replaceWithDefault = exports.replaceWithProp = void 0;
const t = __importStar(require("@babel/types"));
const get_1 = require("../utils/get");
function replaceWithProp(ctr, path) {
    // const cmp = require('react').Component
    // ctr.id.name: cmp
    // ctr.init.property.name: Component
    // ctr.init.object.arguments[0].name: react
    if (get_1.getName(ctr, `init.object.callee`) === 'require') {
        path.replaceWith(t.importDeclaration([
            t.importSpecifier(ctr.id, ctr.init.property),
        ], 
        // source StringLiteral
        ctr.init.object.arguments[0]));
    }
}
exports.replaceWithProp = replaceWithProp;
function replaceWithDefault(ctr, path) {
    // const react1 = require('react')
    // ctr.id.name: react1
    // ctr.init.object.arguments[0].name: react
    if (get_1.getName(ctr, `init.callee`) === 'require') {
        path.replaceWith(t.importDeclaration([
            t.importDefaultSpecifier(ctr.id),
        ], 
        // source StringLiteral
        ctr.init.arguments[0]));
    }
}
exports.replaceWithDefault = replaceWithDefault;
function replaceWithRest(ctr, path) {
    // const { react: react1 } = require('react')
    if (ctr.init.callee.name === 'require') {
        path.replaceWith(t.importDeclaration(ctr.id.properties.map(v => t.importSpecifier(v.value, v.key)), 
        // source StringLiteral
        ctr.init.arguments[0]));
    }
}
exports.replaceWithRest = replaceWithRest;
function replaceWithRequire(path) {
    // require('react')
    if (path.node.callee.name === 'require') {
        path.parentPath.replaceWith(t.importDeclaration([], 
        // source StringLiteral
        path.node.arguments[0]));
    }
}
exports.replaceWithRequire = replaceWithRequire;
