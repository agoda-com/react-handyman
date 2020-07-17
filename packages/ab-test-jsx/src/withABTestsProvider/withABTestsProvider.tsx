/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { ABTests } from '../ABTestsContext';
import ABTestsProvider from '../ABTestsProvider';
import { nameOf } from '../react-utils';

export type withABTestsProviderHoC<T extends ABTests> = <TProps extends Record<string, unknown>>(
  Component: React.ComponentType<TProps>,
  abTests: T | ABTestsSetter<TProps, T>,
  defaultVariant?: 'A' | 'B' | 'Z'
) => React.FunctionComponent<TProps>

type ABTestsSetter<TProps extends Record<string, unknown>, T> = (componentProps: TProps) => T

const withABTestsProvider = <T extends ABTests, TProps extends Record<string, unknown>>(
  Component: React.ComponentType<TProps>,
  abTests: ABTestsSetter<TProps, T> | T,
  defaultVariant?: 'A' | 'B' | 'Z'
) => {
  const Wrapped: React.FC<TProps> = React.memo((props) => {
    const values = typeof abTests === 'function' ? abTests(props) : abTests;
    return (
      <ABTestsProvider abTests={values} defaultVariant={defaultVariant}>
        <Component {...props} />
      </ABTestsProvider>
    );
  });

  Wrapped.displayName = `withABTestsProvider(${nameOf(Component)})`;
  return Wrapped;
};

export default withABTestsProvider;
