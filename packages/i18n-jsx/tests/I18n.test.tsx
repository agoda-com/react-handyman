import 'jest'
import * as React from 'react'
import { render, cleanup, getNodeText } from '@testing-library/react'

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation(() => {})

import I18n from '../src/I18n'
import I18nProvider from '../src/I18nProvider'

const translationsMock = {
  1: 'number based key',
  'example.key': 'string based key',
}

describe('<I18n />', () => {
  afterEach(cleanup)

  it('should render text based on a numeric k prop', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </I18nProvider>
    )

    const innerText = getNodeText(container.querySelector('span'))

    expect(innerText).toEqual('number based key')
  })

  it('should render text based on a string k prop', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k="example.key">Default value</I18n>
        </span>
      </I18nProvider>
    )

    const innerText = getNodeText(container.querySelector('span'))

    expect(innerText).toEqual('string based key')
  })

  it('should render default fallback value when k key is not present in context', () => {
    const { container } = render(
      <I18nProvider translations={translationsMock}>
        <span>
          <I18n k="invalid.key.string">Default value</I18n>
        </span>
      </I18nProvider>
    )

    const innerText = getNodeText(container.querySelector('span'))

    expect(innerText).toEqual('Default value')
  })
})
