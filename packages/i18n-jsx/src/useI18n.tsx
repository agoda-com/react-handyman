import * as React from 'react'
import TranslationsContext from './TranslationsContext'

export type I18nSelector = (k: string, def: string, ...args: (string | number)[]) => string

const format = (template: string, ...args: (string | number)[]): string => {
  return String(template).replace(/\{([^{}]+)\}/g, (match, key: any) => (args[key] != null ? args[key] : key))
}

const getDef = (def: any) => {
  if (Array.isArray(def)) {
    return def.reduce((acc, e) => {
      if (Number.isInteger(e)) return acc + `{${e}}`
      return acc + e
    }, '')
  }

  return def
}

const useI18n = () => {
  const translations = React.useContext(TranslationsContext)

  const i18n: I18nSelector = (k: string, def: string, ...args: (string | number)[]) => {
    return format(translations[k] ? translations[k] : getDef(def), ...args)
  }

  return i18n
}

export default useI18n
