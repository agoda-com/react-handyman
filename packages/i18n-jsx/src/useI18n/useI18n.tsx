import * as React from 'react'
import TranslationsContext from '../TranslationsContext'
import handleNotFound from '../utils/handleNotFound'
import { format } from 'format-to-jsx'
import { I18nSelector } from './selector'

const useI18n = () => {
  const translations = React.useContext(TranslationsContext)
  const i18n: I18nSelector = (k, notFound, ...args) => {
    return format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args)
  }

  return i18n
}

export default useI18n
