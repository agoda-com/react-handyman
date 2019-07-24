import 'jest'
import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})

import withI18n from '../src/withABTests'
import I18nProvider from '../src/ABTestsProvider'
import { I18nSelector } from '../src/useABTests'

const translationsMock = {
  1: 'number based key',
  'example.key': 'string based key',
  'example.template': 'string with {0} placeholder',
  'example.template.many': 'string with {0} placeholder and ending with another {1}',
  'example.template.obj': 'string with {one} or {two} object based values',
}
interface TranslationProps {
  injectedProp: string
}
const TestComponent: React.FC<TranslationProps> = ({ injectedProp }) => <span>{injectedProp}</span>

describe('withI18n()', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should render text based on a numeric k prop', () => {
    const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
      return { injectedProp: i18n(1, 'Default value') }
    })

    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <Wrapped />
      </I18nProvider>
    )

    expect(container.textContent).toEqual('number based key')
  })

  it('should render text based on a string k prop', () => {
    const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
      return { injectedProp: i18n('example.key', 'Default value') }
    })

    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <Wrapped />
      </I18nProvider>
    )

    expect(container.textContent).toEqual('string based key')
  })

  it('should render default fallback value when k key is not present in context', () => {
    const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
      return { injectedProp: i18n('invalid.key.string', 'Default value') }
    })

    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <Wrapped />
      </I18nProvider>
    )

    expect(container.textContent).toEqual('Default value')
  })
  describe('template text', () => {
    it('with with a numeric value', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return { injectedProp: i18n('example.template', 'Default value', 123) }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with 123 placeholder')
    })

    it('should render with with a string value', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return { injectedProp: i18n('example.template', 'Default value', 'some replaced string') }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder')
    })

    it('should render with multiple values', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return { injectedProp: i18n('example.template.many', 'Default value', 'some replaced string', 123) }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123')
    })

    it('should render with string based template and object args', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return {
          injectedProp: i18n('example.template.obj', 'string with {one} or {two} object based values', {
            one: 1,
            two: 2,
          }),
        }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with 1 or 2 object based values')
    })

    it('should render default fallback value when k key is not present in context', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return { injectedProp: i18n('invalid.key.string', 'string with {0} placeholder', 'some replaced string') }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder')
    })

    it('should render default fallback value when k key is not present in context - multiple placeholders', () => {
      const Wrapped = withI18n(TestComponent, (i18n: I18nSelector) => {
        return {
          injectedProp: i18n(
            'invalid.key.string',
            'string with {0} placeholder and ending with another {1}',
            'some replaced string',
            123
          ),
        }
      })

      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <Wrapped />
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123')
    })
  })
})
