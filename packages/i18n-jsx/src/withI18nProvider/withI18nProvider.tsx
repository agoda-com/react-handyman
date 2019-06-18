import * as React from 'react'
import { Translations } from '../TranslationsContext'
import I18nProvider from '../I18nProvider'

type TranslationsSetter<TProps extends {}> = (componentProps: TProps) => Translations

const withI18nProvider = <TProps extends {}>(
  Component: React.ComponentType<TProps>,
  translations: TranslationsSetter<TProps> | Translations
) => {
  const Wrapped: React.FC<TProps> = props => {
    const values = typeof translations === 'function' ? translations(props) : translations
    return (
      <I18nProvider translations={values}>
        <Component {...props} />
      </I18nProvider>
    )
  }

  Wrapped.displayName = `withI18nProvider(${Component.displayName})`
  return Wrapped
}

export default withI18nProvider
