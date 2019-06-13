import * as React from 'react'
import TranslationsContext from '../TranslationsContext'
import { I18nSelector } from './types'
import handleNotFound from '../utils/handleNotFound'
import format from '../utils/format'

const useI18n = () => {
  const translations = React.useContext(TranslationsContext)

  const i18n = (k: string | number, notFound: string, ...args: (number | React.ReactNode)[]) => {
    return format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args)
  }

  return i18n
}

export default useI18n
