import * as React from 'react';
import { useSelector } from 'react-redux';

import { format } from 'format-to-jsx';
import I18nContext from '../I18nContext';
import handleNotFound from '../utils/handleNotFound';
import { I18nSelector } from './selector';

const useI18n = () => {
  const { selector } = React.useContext(I18nContext);
  const translations = useSelector(selector) || {};
  const i18n: I18nSelector = (k, notFound, ...args) =>
    format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args);

  return i18n;
};

export default useI18n;
