import { isCjsFile, transformFileBase } from "./utils/base"

export function cjs2esmVitePlugin() {
  return {
    name: 'cjs2esmVitePlugin',
    transform(src, id) {
      const ROOT = process.cwd().replace(/\\/g, '/') + '/src'

      if (/\.js$/g.test(id) && id.startsWith(ROOT) && isCjsFile(src)) {
        // const { code, map } = transformFileBase(src, id)
        return transformFileBase(src)
      }
    }
  }
}

export { transformFiles } from './scripts'