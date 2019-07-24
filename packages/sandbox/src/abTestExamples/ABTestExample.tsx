import * as React from 'react'
import * as abTests from 'ab-test-jsx'
import { ABTests } from 'ab-test-jsx/lib/ABTestsContext'

interface Experiments extends ABTests {
  exp1: 'A'
}

const { ABTest } = abTests as abTests.ABTestsModule<Experiments>

const ABTestExample: React.FC = () => {
  return (
    <div>
      <ABTest variant="B" name="exp1111">
        <span>This is B variant!</span>
      </ABTest>
    </div>
  )
}
