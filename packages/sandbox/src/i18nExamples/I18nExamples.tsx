import * as React from 'react'
import { I18n, withI18nProvider } from 'i18n-jsx'
import translations from './translations'

const I18nExamples: React.FC = () => {
  return (
    <>
      <p>
        <I18n k="example.key.1">Default fallback text</I18n>
      </p>
      <p>
        <I18n k="example.invalid.or.missing.key">This default text is rendered because key doesn't exists</I18n>
      </p>
    </>
  )
}

export default withI18nProvider(I18nExamples, translations)
