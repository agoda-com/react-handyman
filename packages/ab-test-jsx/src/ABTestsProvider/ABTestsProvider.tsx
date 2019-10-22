import * as React from 'react';
import ABTestsContext, { ABTests } from '../ABTestsContext';
import { ABTestsSettings } from '../ABTestsContext/ABTestsContext';

interface OwnProps<T> {
  abTests: T
  defaultVariant?: 'A' | 'B' | 'Z'
}

type Props<T> = React.PropsWithChildren<OwnProps<T>>

export type ABTestProviderComponent<T extends ABTests> = React.FC<Props<T>>

const ABTestsProvider = React.memo(<T extends ABTests>(props: Props<T>) => {
  const { abTests, children, defaultVariant = 'A' } = props;
  return (
    <ABTestsContext.Provider value={abTests}>
      <ABTestsSettings.Provider value={{ defaultVariant }}>
        {children}
      </ABTestsSettings.Provider>
    </ABTestsContext.Provider>
  );
});

ABTestsContext.displayName = 'ABTestsProvider';

export default ABTestsProvider;
