import * as React from 'react'
import { ABTests } from '../ABTestsContext'
import useABTests from '../useABTests'

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
  type CombinedProps = TAProps & TBProps
  const Wrapped: React.FC<CombinedProps> = React.memo(props => {
    const { isB } = useABTests()
    if (isB(abTestName)) {
      return <BVariantComponent {...props} />
    } else {
      return <AVariantComponent {...props} />
    }
  })

  Wrapped.displayName = `withABTest(A:${AVariantComponent.displayName}, B:${BVariantComponent.displayName})`
  return Wrapped
}

export default withABTest
