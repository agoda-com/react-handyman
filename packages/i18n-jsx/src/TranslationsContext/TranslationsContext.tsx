import * as React from 'react';
import { Translations } from './types';

const TranslationsContext = React.createContext<Translations>({});

export default TranslationsContext;
