import * as React from "react";
import useI18n, { I18nSelector } from "./useI18n";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const withI18n = <TProps extends TI18nProps, TI18nProps extends {}>(
  Component: React.ComponentType<TProps & TI18nProps>,
  mapI18nToProps: (i18n: I18nSelector) => TI18nProps
) => {
  type OwnProps = Omit<TProps, keyof TI18nProps>;

  const Wrapped: React.FC<OwnProps> = props => {
    const i18n = useI18n();

    return <Component {...props as TProps} {...mapI18nToProps(i18n)} />;
  };

  Wrapped.displayName = `withI18n(${Component.displayName})`;
  return Wrapped;
};

export default withI18n;
