import * as React from 'react';
import I18nContext, { Translations } from '../I18nContext';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: (store: any) => Translations;
}

const I18nProvider: React.FC<Props> = (props) => {
  const { selector, children } = props;
  return <I18nContext.Provider value={{ selector }}>{children}</I18nContext.Provider>;
};

I18nProvider.displayName = 'I18nProvider';

export default I18nProvider;
