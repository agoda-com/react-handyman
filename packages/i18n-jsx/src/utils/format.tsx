import * as React from 'react'

const format = (template: string, ...args: (number | React.ReactNode)[]): string | React.ReactNode => {
  const reg = /\{([^{}]+)\}/g
  let containsJSX = false
  const result = template.split(reg).map((value, index) => {
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
    console.log(result)
    return <span>wtf</span>
  }

  return result.join('')
}

export default format
