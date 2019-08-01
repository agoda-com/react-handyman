import * as React from 'react'
import { ABTests } from '../ABTestsContext'
import ABTestsProvider from '../ABTestsProvider'
import { nameOf } from '../react-utils'

export type withABTestsProviderHoC<T extends ABTests> = <TProps extends {}>(
  Component: React.ComponentType<TProps>,
  abTests: T | ABTestsSetter<TProps, T>
) => React.FunctionComponent<TProps>

type ABTestsSetter<TProps extends {}, T> = (componentProps: TProps) => T

const withABTestsProvider = <T extends ABTests, TProps extends {}>(
  Component: React.ComponentType<TProps>,
  abTests: ABTestsSetter<TProps, T> | T
) => {
  const Wrapped: React.FC<TProps> = React.memo(props => {
    const values = typeof abTests === 'function' ? abTests(props) : abTests
    return (
      <ABTestsProvider abTests={values}>
        <Component {...props} />
      </ABTestsProvider>
    )
  })

  Wrapped.displayName = `withABTestsProvider(${nameOf(Component)})`
  return Wrapped
}

export default withABTestsProvider
