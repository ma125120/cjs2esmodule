import * as t from '@babel/types'
import { getName, getSafe } from '../utils/get';

export function replaceExports(node, path) {
  const objName = getSafe(node, 'left.object.name');
  const name = getName(node, 'left.property')

  if (node.operator === '=') {
    if (objName === 'exports') {
      if (path.scope.hasBinding(name)) {
        path.scope.bindings[name].scope.rename(name);
      }
    
      if (name === 'default') {
        // exports['default'] = 213
        path.parentPath.replaceWith(
          t.exportDefaultDeclaration(node.right)
        )
      } else {
        // exports.a = 213
        path.parentPath.replaceWith(
          t.exportNamedDeclaration(
            t.variableDeclaration(
              "const",
              [
                t.variableDeclarator(node.left.property.type === 'Identifier' ? node.left.property : t.identifier(node.left.property.value), node.right)
              ]
            )
          )
        )
      }
    } else if (objName === 'module' && name === 'exports') {
      if (getName(node, 'right.object') === 'exports' && getName(node, 'right.property') === 'default') {
        // module.exports = exports["default"]
        // 其他地方已转换，直接删除
        path.parentPath.remove()
      } else {
        // module.exports = 123
        path.parentPath.replaceWith(
          t.exportDefaultDeclaration(node.right)
        )
      }
    }
  }
}
