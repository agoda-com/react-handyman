import * as React from 'react'
import { Translations } from '../TranslationsContext'
import I18nProvider from '../I18nProvider'

const withI18nProvider = <TProps extends {}>(Component: React.ComponentType<TProps>, translations: Translations) => {
  const Wrapped: React.FC<TProps> = props => {
    return (
      <I18nProvider translations={translations}>
        <Component {...props} />
      </I18nProvider>
    )
  }

  Wrapped.displayName = `withI18nProvider(${Component.displayName})`
  return Wrapped
}

export default withI18nProvider
