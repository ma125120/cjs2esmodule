"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFiles = exports.cjs2esmVitePlugin = void 0;
const base_1 = require("./utils/base");
/**
 *
 * @param sourceDir 监听的目录，默认是src
 * @returns
 */
function cjs2esmVitePlugin({ sourceDir = 'src' } = {}) {
    return {
        name: 'cjs2esmVitePlugin',
        transform(src, id) {
            const ROOT = process.cwd().replace(/\\/g, '/') + `/${sourceDir}`;
            if (/\.js$/g.test(id) && id.startsWith(ROOT) && base_1.isCjsFile(src)) {
                // const { code, map } = transformFileBase(src, id)
                return base_1.transformFileBase(src);
            }
        }
    };
}
exports.cjs2esmVitePlugin = cjs2esmVitePlugin;
var scripts_1 = require("./scripts");
Object.defineProperty(exports, "transformFiles", { enumerable: true, get: function () { return scripts_1.transformFiles; } });
