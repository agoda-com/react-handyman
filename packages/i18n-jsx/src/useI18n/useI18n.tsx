import * as React from 'react';
import { format } from 'format-to-jsx';
import TranslationsContext from '../TranslationsContext';
import handleNotFound from '../utils/handleNotFound';
import { I18nSelector } from './selector';

const useI18n = () => {
  const translations = React.useContext(TranslationsContext);
  const i18n: I18nSelector = (k, notFound, ...args) =>
    format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args);

  return i18n;
};

export default useI18n;
