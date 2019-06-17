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
  const argsDictionary =
    args && typeof args[0] === 'object' && !React.isValidElement(args[0])
      ? args[0]
      : args.reduce((acc: any, a, index) => {
          acc[index] = a
          return acc
        }, {})
  const parts = template.split(reg)

  if (process.env.NODE_ENV !== 'production') {
    const noOfPlaceholders = Math.floor(parts.length / 2)
    const noOfArgs = Object.keys(argsDictionary).length
    if (noOfPlaceholders !== noOfArgs) {
      console.warn(
        `[i18n-jsx]: Template '${template}' contains different number of placeholders than passed arguments ([${Object.keys(
          argsDictionary
        ).join(',')}]): found ${noOfPlaceholders} placeholders while ${noOfArgs} arguments have been provided.`
      )
    }
  }

  const results = parts.map((value, index) => {
    if (index % 2 === 0) {
      // this is template so just return
      return value
    } else {
      const key = value
      const replaceValue = argsDictionary[key]

      if (replaceValue) {
        if (typeof replaceValue !== 'string' && typeof replaceValue !== 'number') {
          containsJSX = true
        }
        return replaceValue
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[i18n-jsx]: Failed replacing the template '${template}' - '${key}' index wasn't provided!`)
        }
        return ''
      }
    }
  })
  if (containsJSX) {
    return (
      <>{results.map((e, index) => (React.isValidElement(e) ? React.cloneElement(e, { key: index }) : e))}</>
    ) as any
  }

  return results.join('') as any
}

export default format
