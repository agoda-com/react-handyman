import * as React from 'react'
import TranslationsContext from '../TranslationsContext'
import { I18nSelector } from './types'
import handleNotFound from '../notFound/handleNotFound'

const format = (template: string, ...args: (string | number)[]): string => {
  return String(template).replace(/\{([^{}]+)\}/g, (match, key: any) => (args[key] != null ? args[key] : key))
}

const useI18n = () => {
  const translations = React.useContext(TranslationsContext)

  const i18n: I18nSelector = (k: string | number, notFound: string, ...args: (string | number)[]) => {
    return format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args)
  }

  return i18n
}

export default useI18n
