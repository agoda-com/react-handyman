import * as React from 'react'
import { I18n, withI18nProvider, useI18n } from 'i18n-jsx'
import translations from './translations'
import Component, { WrappedComponent } from './Component'

const I18nExamples: React.FC = () => {
  const i18n = useI18n()
  const linkText = i18n('example.prop.link', 'Default link text')
  return (
    <>
      <p>
        <I18n k="example.key.1">Default fallback text</I18n>
      </p>
      <p>
        <I18n k={123}>Default fallback text</I18n>
      </p>
      <p>
        <I18n k="example.key.2" args={[123]}>
          This is with formatted number {0}
        </I18n>
      </p>
      <p>
        <I18n k="example.invalid.or.missing.key">This default text is rendered because key doesn't exists</I18n>
      </p>
      <Component linkText={linkText} strongText={i18n('example.prop.strong', 'Default prop.strong text')} />
      <WrappedComponent linkText={linkText} />
    </>
  )
}

export default withI18nProvider(I18nExamples, translations)
