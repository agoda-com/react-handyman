import 'jest'
import * as React from 'react'
import { render } from '@testing-library/react'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})

import useI18n from '../src/useI18n'
import I18nProvider from '../src/I18nProvider'

const translationsMock = {
  1: 'number based key',
  'example.key': 'string based key',
  'example.template': 'string with {0} placeholder',
  'example.template.many': 'string with {0} placeholder and ending with another {1}',
}

const testWithComponent = (Component: React.ComponentType, expected: string) => {
  const { container } = render(
    <I18nProvider translations={translationsMock}>
      <div>
        <Component />
      </div>
    </I18nProvider>
  )

  expect(container.textContent).toEqual(expected)
}

describe('useI18n hook should return i18n function that', () => {
  it('should return text based on a numeric k prop', () => {
    const Component: React.FC = () => {
      const i18n = useI18n()
      return <span>{i18n(1, 'Default text')}</span>
    }

    testWithComponent(Component, 'number based key')
  })

  it('should return text based on a string k prop', () => {
    const Component: React.FC = () => {
      const i18n = useI18n()
      return <span>{i18n('example.key', 'Default text')}</span>
    }

    testWithComponent(Component, 'string based key')
  })

  it('should return fallback text in case k is missing', () => {
    const Component: React.FC = () => {
      const i18n = useI18n()
      return <span>{i18n('invalid.key.string', 'Default text')}</span>
    }

    testWithComponent(Component, 'Default text')
  })

  it('should allow using template string with single param', () => {
    const Component: React.FC = () => {
      const i18n = useI18n()
      return <span>{i18n('example.template', 'Default text', 123)}</span>
    }

    testWithComponent(Component, 'string with 123 placeholder')
  })

  it('should allow using template string with many params', () => {
    const Component: React.FC = () => {
      const i18n = useI18n()
      return <span>{i18n('example.template.many', 'Default text', 123, 'some text')}</span>
    }

    testWithComponent(Component, 'string with 123 placeholder and ending with another some text')
  })
})
