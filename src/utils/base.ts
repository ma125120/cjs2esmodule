import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from '@babel/types'
import { replaceWithDefault, replaceWithProp, replaceWithRequire, replaceWithRest } from "../replace/require";
import { replaceExports } from "../replace/exports";
import { getName, getSafe } from "./get";

export const visitors = {
  VariableDeclaration(path) {
    const ctr = path.node.declarations[0]

    try {
      if (getSafe(ctr, 'init.property')) {
        replaceWithProp(ctr, path);
      } else if (ctr.id.type === 'ObjectPattern') {
        replaceWithRest(ctr, path)
      } else if (getName(ctr, 'init.callee') === 'require') {
        replaceWithDefault(ctr, path)
      }
    } catch (err) {
      console.log(err)
    }
  },
  CallExpression(path) {
    if (t.isExpressionStatement(path.parent)) {
      replaceWithRequire(path)
    }
  },

  // 导出
  AssignmentExpression(path) {
    try {
      const { node } = path
      replaceExports(node, path)
    } catch (err) {
      console.log(err)
    }
  },
}

export const transformFileBase = (src) => {
  try {
    const ast = parser.parse(src);
    traverse(ast, visitors);

    return generate(ast);
  } catch (err) {
    // sourceType 默认为 script，如果报错，则用 module 解析
    const ast = parser.parse(src, { sourceType: "module" });
    traverse(ast, visitors);

    return generate(ast);
  }
}

export function isCjsFile(content) {
  return /(exports[\.\[]|module\.exports|require\()/g.test(content)
}
