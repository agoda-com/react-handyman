import * as React from 'react'
import { ABTests } from '../ABTestsContext'
import ABTestsProvider from '../ABTestsProvider'

type TranslationsSetter<TProps extends {}> = (componentProps: TProps) => ABTests

const withABTestsProvider = <TProps extends {}>(
  Component: React.ComponentType<TProps>,
  abTests: TranslationsSetter<TProps> | ABTests
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
