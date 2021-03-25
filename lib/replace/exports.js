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
exports.replaceExports = void 0;
const t = __importStar(require("@babel/types"));
const get_1 = require("../utils/get");
function replaceExports(node, path) {
    const objName = get_1.getSafe(node, 'left.object.name');
    const name = get_1.getName(node, 'left.property');
    if (node.operator === '=') {
        if (objName === 'exports') {
            if (path.scope.hasBinding(name)) {
                path.scope.bindings[name].scope.rename(name);
            }
            if (name === 'default') {
                // exports['default'] = 213
                path.parentPath.replaceWith(t.exportDefaultDeclaration(node.right));
            }
            else {
                // exports.a = 213
                path.parentPath.replaceWith(t.exportNamedDeclaration(t.variableDeclaration("const", [
                    t.variableDeclarator(node.left.property.type === 'Identifier' ? node.left.property : t.identifier(node.left.property.value), node.right)
                ])));
            }
        }
        else if (objName === 'module' && name === 'exports') {
            if (get_1.getName(node, 'right.object') === 'exports' && get_1.getName(node, 'right.property') === 'default') {
                // module.exports = exports["default"]
                // 其他地方已转换，直接删除
                path.parentPath.remove();
            }
            else {
                // module.exports = 123
                path.parentPath.replaceWith(t.exportDefaultDeclaration(node.right));
            }
        }
    }
}
exports.replaceExports = replaceExports;
