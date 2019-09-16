import { ABTests } from './ABTestsContext';
import { ABTestComponent } from './ABTest/ABTest';
import { withABTestsProviderHoC } from './withABTestsProvider/withABTestsProvider';
import { ABTestProviderComponent } from './ABTestsProvider/ABTestsProvider';
import { useABTestsHook } from './useABTests/useABTests';
import { withABTestHoC } from './withABTest/withABTest';
import { withABTestsHoC } from './withABTests/withABTests';

export { default as ABTest } from './ABTest';
export { default as ABTestsProvider } from './ABTestsProvider';
export { default as useABTests } from './useABTests';
export { default as withABTest } from './withABTest';
export { default as withABTests } from './withABTests';
export { default as withABTestsProvider } from './withABTestsProvider';

export type Variant = 'A' | 'B'

export interface ABTestsModule<T extends ABTests> {
  ABTest: ABTestComponent<T>
  ABTestsProvider: ABTestProviderComponent<T>
  useABTests: useABTestsHook<T>
  withABTest: withABTestHoC<T>
  withABTests: withABTestsHoC<T>
  withABTestsProvider: withABTestsProviderHoC<T>
}
