import * as React from 'react'
import { Variant, ABTests } from '../ABTestsContext'
import useABTests from '../useABTests'

interface OwnProps<T> {
  variant: Variant
  name: Extract<keyof T, string | number>
}
interface Props<T> extends React.PropsWithChildren<OwnProps<T>> {}

export interface ABTestComponent<T extends ABTests> extends React.FC<Props<T>> {}

const ABTest = React.memo(<T extends ABTests>(props: Props<T>) => {
  const { children, variant, name } = props
  const { getVariant } = useABTests()

  if (getVariant(name) === variant) {
    return <>{children}</>
  } else return null
})

ABTest.displayName = 'ABTest'

export default ABTest
