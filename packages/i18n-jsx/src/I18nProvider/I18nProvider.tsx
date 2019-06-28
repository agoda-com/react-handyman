import * as React from 'react'
import TranslationsContext, { Translations } from '../TranslationsContext'

interface Props {
  translations: Translations
}

const I18nProvider: React.FC<Props> = React.memo(props => {
  const { translations, children } = props
  return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
})

I18nProvider.displayName = 'I18nProvider'

export default I18nProvider
