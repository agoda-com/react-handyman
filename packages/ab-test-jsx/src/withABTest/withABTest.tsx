/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { ABTests } from '../ABTestsContext';
import useABTests from '../useABTests';
import { nameOf } from '../react-utils';

export type withABTestHoC<T extends ABTests> = <
  TAProps extends {},
  TBProps extends {},
  TABTestName extends Extract<keyof T, string | number>
>(
  AVariantComponent: React.ComponentType<TAProps>,
  BVariantComponent: React.ComponentType<TBProps>,
  abTestName: TABTestName
) => React.FC<TAProps & TBProps>;

const withABTest = <
  TAProps extends {},
  TBProps extends {},
  TABTests extends ABTests,
  TABTestName extends Extract<keyof TABTests, string | number>
>(
  AVariantComponent: React.ComponentType<TAProps>,
  BVariantComponent: React.ComponentType<TBProps>,
  abTestName: TABTestName
) => {
  type CombinedProps = TAProps & TBProps;
  const Wrapped: React.FC<CombinedProps> = React.memo((props) => {
    const { isB } = useABTests();
    if (isB(abTestName)) {
      return <BVariantComponent {...props} />;
    }
    return <AVariantComponent {...props} />;
  });

  Wrapped.displayName = `withABTest(A:${nameOf(AVariantComponent)}, B:${nameOf(
    BVariantComponent
  )})`;
  return Wrapped;
};

export default withABTest;
