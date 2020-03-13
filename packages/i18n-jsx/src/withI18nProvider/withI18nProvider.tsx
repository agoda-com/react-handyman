/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import I18nProvider from '../I18nProvider';
import { Translations } from '../I18nContext';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withI18nProvider = (selector: (state: any) => Translations) =>
  (Component: React.ComponentType) => {
    const Wrapped: React.FC = React.memo(props => (
      <I18nProvider selector={selector}>
        <Component {...props} />
      </I18nProvider>
    ));

    Wrapped.displayName = `withI18nProvider(${Component.displayName})`;
    return Wrapped;
  };

export default withI18nProvider;
