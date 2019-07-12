import 'jest';
import * as React from 'react';
import withI18n from './withI18n';
import { render } from '@testing-library/react'
import TranslationsContext from '../TranslationsContext'
import { I18nSelector } from '../useI18n'

interface Translations {
  translations: {
    name: string,
  },
}

interface BaseProps {}

describe('withI18n', () => {
  const mapI18nToProps = (i18n: I18nSelector): Translations => ({
    translations: {
      name: i18n(1, 'Some default value'),
    },
  });

  it('should render component with i18n translations', () => {

    const Component: React.FC<BaseProps & Translations> = (props) => <div>{props.translations.name}</div>;
    const ComponentWithTranslations = withI18n(Component, mapI18nToProps)

    const { asFragment } = render(
      <TranslationsContext.Provider value={{1: 'translatedName'}}>
        <ComponentWithTranslations />
      </TranslationsContext.Provider>
    )

    expect(asFragment()).toMatchSnapshot();
  });

});