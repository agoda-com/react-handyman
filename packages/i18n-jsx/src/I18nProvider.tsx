import * as React from 'react'
import TranslationsContext, { Translations } from './TranslationsContext'

interface Props {
  translations: Translations
}

const I18nProvider: React.FC<Props> = props => {
  const { translations, children } = props
  return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
}

export default I18nProvider
