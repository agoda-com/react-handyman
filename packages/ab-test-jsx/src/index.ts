import { ABTests } from './ABTestsContext'
import { ABTestComponent } from './ABTest/ABTest'
import { withABTestsProviderComponent } from './withABTestsProvider/withABTestsProvider'

export { default as ABTest } from './ABTest'
export { default as ABTestsProvider } from './ABTestsProvider'
export { default as useABTests } from './useABTests'
export { default as withABTest } from './withABTest'
export { default as withABTests } from './withABTests'
export { default as withABTestsProvider } from './withABTestsProvider'

export type Variant = 'A' | 'B'

export interface ABTestsModule<T extends ABTests> {
  ABTest: ABTestComponent<T>
  withABTestsProvider: withABTestsProviderComponent<T>
}
