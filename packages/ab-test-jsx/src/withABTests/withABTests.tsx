import * as React from 'react'
import ABTestsContext, { ABTests } from '../ABTestsContext'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Optionalize<T extends K, K> = Omit<T, keyof K>

const withABTests = <TProps extends TABTests, TABTests extends ABTests>(Component: React.ComponentType<TProps>) => {
  type OwnProps = Optionalize<TProps, TABTests>
  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const abTests = React.useContext(ABTestsContext)
    return <Component {...(props as TProps)} {...abTests} />
  })

  Wrapped.displayName = `withABTests(${Component.displayName})`
  return Wrapped
}

export default withABTests
