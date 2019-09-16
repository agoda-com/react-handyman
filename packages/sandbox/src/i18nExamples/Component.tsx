import * as React from 'react';
import { withI18n, I18nSelector } from 'i18n-jsx';

interface TranslationProps {
  strongText: string
}

interface OwnProps {
  linkText: string
}

type Props = TranslationProps & OwnProps

const Component: React.FC<Props> = ({ strongText, linkText }) => (
  <>
    <p>
      <strong>{strongText}</strong>
    </p>
    <p>
      <a href="http://localhost:3000/">{linkText}</a>
    </p>
  </>
);

const mapI18nToProps = (i18n: I18nSelector): TranslationProps => ({
  strongText: i18n('example.hoc.strong', 'Default value for HOC')
});

const WrappedComponent = withI18n(Component, mapI18nToProps);

export { WrappedComponent };

export default Component;
