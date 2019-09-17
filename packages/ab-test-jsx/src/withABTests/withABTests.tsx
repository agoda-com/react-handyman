/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import ABTestsContext, { ABTests } from '../ABTestsContext';
import { nameOf } from '../react-utils';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type withABTestsHoC<T extends ABTests> = <TProps extends { abTests: T }>(
  Component: React.ComponentType<TProps>
) => React.FC<Omit<TProps, 'abTests'>>

const withABTests = <TProps extends { abTests: TABTests }, TABTests extends ABTests>(
  Component: React.ComponentType<TProps>,
) => {
  type OwnProps = Omit<TProps, 'abTests'>
  const Wrapped: React.FC<OwnProps> = React.memo((props) => {
    const abTests = React.useContext(ABTestsContext);
    return <Component {...(props as TProps)} abTests={abTests} />;
  });

  Wrapped.displayName = `withABTests(${nameOf(Component)})`;
  return Wrapped;
};

export default withABTests;
