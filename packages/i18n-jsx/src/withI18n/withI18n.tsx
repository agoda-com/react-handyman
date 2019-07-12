import * as React from 'react'
import useI18n from '../useI18n/useI18n'
import { I18nSelector } from '../useI18n/selector'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

const withI18n = <TProps extends TI18nProps, TI18nProps extends {}>(
  Component: React.ComponentType<TProps>,
  mapI18nToProps: (i18n: I18nSelector) => TI18nProps
) => {
  type OwnProps = Optionalize<TProps, TI18nProps>;

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const i18n = useI18n()
    return <Component {...props as TProps} {...mapI18nToProps(i18n)} />
  });

  Wrapped.displayName = `withI18n(${Component.displayName})`;
  return Wrapped;
}

export default withI18n;
