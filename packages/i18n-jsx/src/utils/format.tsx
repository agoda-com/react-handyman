import * as React from 'react'

const format = <TArgs extends (string | number | React.ReactNode)[]>(
  template: string,
  ...args: TArgs
): TArgs extends (string | number)[] ? string : React.ReactNode => {
  const reg = /\{([^{}]+)\}/g
  let containsJSX = false
  const results = template.split(reg).map((value, index) => {
    if (index % 2 === 0) {
      // this is template so just return
      return value
    } else {
      const key = parseInt(value)
      if (args[key]) {
        if (typeof args[key] !== ('string' || 'number')) {
          containsJSX = true
        }
        return args[key]
      } else {
        console.warn(`Template ${template} doesn't contain matching index '${key}'`)
        return ''
      }
    }
  })
  if (containsJSX) {
    return <>{results}</> as any;
  }

  return results.join('') as any;
}

export default format
