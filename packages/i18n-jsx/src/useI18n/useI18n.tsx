import * as React from 'react';
import { useSelector, ReactReduxContext } from 'react-redux';

import { format } from 'format-to-jsx';
import I18nContext, { Translations } from '../I18nContext';
import handleNotFound from '../utils/handleNotFound';
import { I18nSelector } from './selector';

const makeI18n = (translations: Translations): I18nSelector => (k, notFound, ...args) =>
  format(translations[k] ? translations[k] : handleNotFound(k, notFound), ...args);

const useI18n = () => {
  const { selector } = React.useContext(I18nContext);
  const store = React.useContext(ReactReduxContext);
  if (!store) {
    return makeI18n({});
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translations = useSelector(selector) || {};
  return makeI18n(translations);
};

export default useI18n;
