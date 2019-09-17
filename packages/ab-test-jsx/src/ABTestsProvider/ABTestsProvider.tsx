import * as React from 'react';
import ABTestsContext, { ABTests } from '../ABTestsContext';

interface OwnProps<T> {
  abTests: T
}

type Props<T> = React.PropsWithChildren<OwnProps<T>>

export type ABTestProviderComponent<T extends ABTests> = React.FC<Props<T>>

const ABTestsProvider = React.memo(<T extends ABTests>(props: Props<T>) => {
  const { abTests, children } = props;
  return <ABTestsContext.Provider value={abTests}>{children}</ABTestsContext.Provider>;
});

ABTestsContext.displayName = 'ABTestsContext';

export default ABTestsProvider;
