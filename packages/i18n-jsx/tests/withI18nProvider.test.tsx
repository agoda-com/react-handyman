import 'jest'
import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

import I18n from '../src/I18n'
import withI18nProvider from '../src/withI18nProvider'
import { Translations } from '../src/TranslationsContext'

const SimpleWrapper: React.FC = ({ children }) => <div>{children}</div>

interface WithTranslationsProps {
  translations: Translations
}
const WithPropsWrapper: React.FC<WithTranslationsProps> = ({ children }) => <div>{children}</div>

describe('withI18nProvider()', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should initialize context with static value passed', () => {
    const Wrapped = withI18nProvider(SimpleWrapper, { 1: 'Context value' })

    const { container } = render(
      <Wrapped>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </Wrapped>
    )

    expect(container.textContent).toEqual('Context value')
  })

  it('should initialize context based on selector passed', () => {
    const selector = (props: WithTranslationsProps) => props.translations
    const Wrapped = withI18nProvider(WithPropsWrapper, selector)

    const { container } = render(
      <Wrapped translations={{ 1: 'Context value' }}>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </Wrapped>
    )

    expect(container.textContent).toEqual('Context value')
  })
})
