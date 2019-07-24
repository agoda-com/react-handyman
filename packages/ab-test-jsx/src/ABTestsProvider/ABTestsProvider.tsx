import * as React from 'react'
import ABTestsContext, { ABTests } from '../ABTestsContext'

interface Props {
  abTests: ABTests
}

const ABTestsProvider: React.FC<Props> = React.memo(props => {
  const { abTests, children } = props
  return <ABTestsContext.Provider value={abTests}>{children}</ABTestsContext.Provider>
})

ABTestsContext.displayName = 'ABTestsContext'

export default ABTestsProvider
