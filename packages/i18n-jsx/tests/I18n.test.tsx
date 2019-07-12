import 'jest'
import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
const consoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {})

import I18n from '../src/I18n'
import I18nProvider from '../src/I18nProvider'

const translationsMock = {
  1: 'number based key',
  'example.key': 'string based key',
  'example.template': 'string with {0} placeholder',
  'example.template.many': 'string with {0} placeholder and ending with another {1}',
  'example.template.obj': 'string with {one} or {two} object based values',
}

describe('<I18n />', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should render text based on a numeric k prop', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </I18nProvider>
    )

    expect(container.textContent).toEqual('number based key')
  })

  it('should render text based on a string k prop', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k="example.key">Default value</I18n>
        </span>
      </I18nProvider>
    )

    expect(container.textContent).toEqual('string based key')
  })

  it('should render default fallback value when k key is not present in context', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k="invalid.key.string">Default value</I18n>
        </span>
      </I18nProvider>
    )

    expect(container.textContent).toEqual('Default value')
  })

  describe('template text', () => {
    it('with with a numeric value', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="example.template" args={[123]}>
              Default value
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with 123 placeholder')
    })

    it('should render with with a string value', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="example.template" args={['some replaced string']}>
              Default value
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder')
    })

    it('should render with multiple values', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="example.template.many" args={['some replaced string', 123]}>
              Default value
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123')
    })

    it('should render with string based template and object args', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="example.template.obj" args={{ one: 1, two: 2 }}>
              {`string with {one} or {two} object based values`}
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with 1 or 2 object based values')
    })

    it('should render default fallback value when k key is not present in context', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="invalid.key.string" args={['some replaced string']}>
              {'string with {0} placeholder'}
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder')
    })

    it('should render default fallback value when k key is not present in context - multiple placeholders', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="invalid.key.string" args={['some replaced string', 123]}>
              {'string with {0} placeholder and ending with another {1}'}
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123')
    })

    it('should throw error when child element is missing', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="error" />
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('')
      expect(consoleError).toHaveBeenCalledTimes(1)
      expect(consoleError).toHaveBeenCalledWith(
        `[i18n-jsx]: I18n component for key 'error' doesn't contain a valid default value. A default value must be provided as a single only child of the <I18n> component, and it must be a string value.`
      )
    })

    it('should throw error when child element is not a string / number', () => {
      const { container } = render(
        <I18nProvider translations={translationsMock}>
          <span>
            <I18n k="error">
              <div>lol wat</div>
            </I18n>
          </span>
        </I18nProvider>
      )

      expect(container.textContent).toEqual('')
      expect(consoleError).toHaveBeenCalledTimes(1)
      expect(consoleError).toHaveBeenCalledWith(
        `[i18n-jsx]: I18n component for key 'error' doesn't contain a valid default value. A default value must be provided as a single only child of the <I18n> component, and it must be a string value.`
      )
    })
  })
})
