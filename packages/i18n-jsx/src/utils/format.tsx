import * as React from 'react'
import { FArgs, FArgsPrimitives } from './types'

const format = <TArgs extends FArgs>(
  template: string,
  ...args: TArgs
): TArgs extends FArgsPrimitives ? string : React.ReactNode => {
  if (!template || template.length === 0) {
    throw new Error(`[i18n-jsx]: format() method has been called without a template string!`)
  }
  const reg = /\{([^{}]+)\}/g
  let containsJSX = false
  const parts = template.split(reg)
  if (process.env.NODE_ENV !== 'production') {
    const noOfPlaceholders = Math.floor(parts.length / 2)
    if (noOfPlaceholders !== args.length) {
      console.warn(
        `[i18n-jsx]: Template '${template}' contains different number of indexes than passed arguments ([${args.join(
          ','
        )}]): found ${noOfPlaceholders} placeholders while ${args.length} arguments have been provided.`
      )
    }
  }

  const results = parts.map((value, index) => {
    if (index % 2 === 0) {
      // this is template so just return
      return value
    } else {
      const isStringKey = typeof value === 'string'
      const key = isStringKey ? value : parseInt(value)
      const replaceValue = isStringKey ? (args[0] as any)[key] : args[key as any]

      if (replaceValue) {
        if (typeof replaceValue !== 'string' && typeof replaceValue !== 'number') {
          containsJSX = true
        }
        return replaceValue
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[i18n-jsx]: Template '${template}' doesn't contain matching index '${key}'`)
        }
        return ''
      }
    }
  })
  if (containsJSX) {
    return <>{results}</> as any
  }

  return results.join('') as any
}

export default format
