import * as t from '@babel/types'

export function replaceWithProp(ctr, path) {
  // const cmp = require('react').Component
  // ctr.id.name: cmp
  // ctr.init.property.name: Component
  // ctr.init.object.arguments[0].name: react
  if (ctr.init.object.callee && ctr.init.object.callee.name === 'require') {
    path.replaceWith(
      t.importDeclaration(
        [
          t.importSpecifier(ctr.id, ctr.init.property),
        ],
        // source StringLiteral
        ctr.init.object.arguments[0]
      )
    )
  }
}

export function replaceWithDefault(ctr, path) {
  // const react1 = require('react')
  // ctr.id.name: react1
  // ctr.init.object.arguments[0].name: react
  if (ctr.init.callee.name === 'require') {
    path.replaceWith(
      t.importDeclaration(
        [
          t.importDefaultSpecifier(ctr.id),
        ],
        // source StringLiteral
        ctr.init.arguments[0]
      )
    )
  }
}

export function replaceWithRest(ctr, path) {
  // const { react: react1 } = require('react')
  // ctr.id.name: react1
  // ctr.init.object.arguments[0].name: react

  if (ctr.init.callee.name === 'require') {
    path.replaceWith(
      t.importDeclaration(
        ctr.id.properties.map(v => t.importSpecifier(v.value, v.key,)),
        // source StringLiteral
        ctr.init.arguments[0]
      )
    )
  }
}

export function replaceWithRequire(path) {
  // require('react')
  if (path.node.callee.name === 'require') {
    const arg = path.node.arguments[0]
    path.parentPath.replaceWith(
      t.importDeclaration(
        [],
        // source StringLiteral
        path.node.arguments[0]
      )
    )
  }
}