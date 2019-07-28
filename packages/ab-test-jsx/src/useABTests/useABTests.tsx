import * as React from 'react'
import ABTestsContext, { ABTests } from '../ABTestsContext'

const useABTests = <T extends ABTests, TName extends Extract<keyof T, string | number>>() => {
  const abTests = React.useContext(ABTestsContext) as T

  const getVariant = (name: TName) => abTests[name] || 'Z'
  const isB = (name: TName) => getVariant(name) === 'B'
  const isA = (name: TName) => getVariant(name) === 'A'

  return {
    getVariant,
    isB,
    isA,
  }
}

export default useABTests
