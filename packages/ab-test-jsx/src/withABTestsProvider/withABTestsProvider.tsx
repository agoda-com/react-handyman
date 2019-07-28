import * as React from 'react'
import { ABTests } from '../ABTestsContext'
import ABTestsProvider from '../ABTestsProvider'

export type withABTestsProviderComponent<T extends ABTests> = <TProps extends {}>(
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

  Wrapped.displayName = `withABTestsProvider(${Component.displayName})`
  return Wrapped
}

export default withABTestsProvider
