import { isCjsFile, transformFileBase } from "./utils/base"

/**
 * 
 * @param sourceDir 监听的目录，默认是src 
 * @returns 
 */
export function cjs2esmVitePlugin({ sourceDir = 'src' } = {}) {
  return {
    name: 'cjs2esmVitePlugin',
    transform(src, id) {
      const ROOT = process.cwd().replace(/\\/g, '/') + `/${sourceDir}`

      if (/\.js$/g.test(id) && id.startsWith(ROOT) && isCjsFile(src)) {
        // const { code, map } = transformFileBase(src, id)
        return transformFileBase(src)
      }
    }
  }
}

export { transformFiles } from './scripts'