import * as React from 'react'
import { I18n, withI18nProvider, useI18n } from 'i18n-jsx'
import Component, { WrappedComponent } from './Component'

const translations = {
  'example.key.1': 'This is text under example.key.1 value',
  'example.key.2': 'This is with formatted number {0}',
  'example.prop.strong': 'This is strong text',
  'example.hoc.strong': 'This is strong text via HOC',
  'example.prop.link': 'Some link text passed via prop',
  123: 'this is number based key value',
  'example.object.args': 'Object based args {one} {two}',
}

const I18nExamples: React.FC = () => {
  const i18n = useI18n()
  const linkText = i18n('example.prop.link', 'Default link text')
  const objFormattedText = i18n('example.object.args', 'Default object based args {one} {two}', {
    one: 1,
    two: <span>lol</span>,
  })
  return (
    <>
      <p>
        <I18n k="example.key.1">[Default] fallback text</I18n>
      </p>
      <p>
        <I18n k={123}>[Default] fallback text</I18n>
      </p>
      <p>
        <I18n k="example.key.2" args={[123]}>
          {'[Default] This is with formatted number {0}'}
        </I18n>
      </p>
      <p>
        <I18n k="example.object.args" args={{ one: 1, two: 2 }}>
          {`[Default] This is with formatted number {0}`}
        </I18n>
      </p>
      <p>
        <I18n k="invalid.example.object.args" args={{ one: 1, two: 2 }}>
          {`[Default] This is with formatted number {one} {two}`}
        </I18n>
      </p>
      <p>{objFormattedText}</p>
      <p>
        <I18n k="example.invalid.or.missing.key">This default text is rendered because key doesn&#39;t exists</I18n>
      </p>
      <Component linkText={linkText} strongText={i18n('example.prop.strong', 'Default prop.strong text')} />
      <WrappedComponent linkText={linkText} />
    </>
  )
}

export default withI18nProvider(I18nExamples, translations)
