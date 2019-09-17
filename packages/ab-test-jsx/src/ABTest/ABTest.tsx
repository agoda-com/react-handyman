import * as React from 'react';
import { Variant, ABTests } from '../ABTestsContext';
import useABTests from '../useABTests';

interface OwnProps<T> {
  variant: Variant
  name: Extract<keyof T, string | number>
}
type Props<T> = React.PropsWithChildren<OwnProps<T>>

export type ABTestComponent<T extends ABTests> = React.FC<Props<T>>

const ABTest = React.memo(<T extends ABTests>(props: Props<T>) => {
  const { children, variant, name } = props;
  const { getVariant } = useABTests();

  if (getVariant(name) === variant) {
    return <>{children}</>;
  } return null;
});

ABTest.displayName = 'ABTest';

export default ABTest;
