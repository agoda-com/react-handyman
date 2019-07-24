import * as React from 'react'
import ABTestsContext from '../ABTestsContext'

type TestName = string | number

const useABTests = () => {
  const abTests = React.useContext(ABTestsContext)

  const getVariant = (name: TestName) => abTests[name] || 'A'
  const isB = (name: TestName) => getVariant(name) === 'B'
  const isA = (name: TestName) => getVariant(name) === 'A'

  return {
    getVariant,
    isB,
    isA,
  }
}

export default useABTests
