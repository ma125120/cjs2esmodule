const reg = /(\w+)\[(\d+)\]/
type nameType = string | Array<string>

const _get = (obj: any, names: nameType) => {
  const keys = Array.isArray(names) ? names : names.split('.')

  return keys.reduce((prev, next) => {
    if (reg.test(next)) {
      const [, name, index] = next.match(reg)
      return prev && prev[name] && prev[name][index]
    } else {
      return prev && prev[next]
    }
  }, obj)
}

export const getSafe = (obj: any, names: nameType, defaultValue?: any) => _get(obj, names) || defaultValue

export const getName = (obj: any, names: string) => getSafe(obj, `${names}.name`) || getSafe(obj, `${names}.value`)
