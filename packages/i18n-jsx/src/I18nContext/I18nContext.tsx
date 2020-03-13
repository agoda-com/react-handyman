import * as React from 'react';
import { Translations } from './types';

type I18nContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: (store: any) => Translations
}

const I18nContext = React.createContext<I18nContextType>({ selector: store => store.translations });

export default I18nContext;
