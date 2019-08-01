import React from 'react'
import { render, cleanup } from '@testing-library/react'
import * as ABTestJsx from '../src/index'

type Tests = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const { withABTestsProvider, ABTest } = ABTestJsx as ABTestJsx.ABTestsModule<Tests>

describe('ABTest', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should wrap component with context data when passing abTest as value', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B',
    }

    const App: React.FC = ({ children }) => <div>{children}</div>

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A</span>
        </ABTest>
        <ABTest name="test1" variant="B">
          <span>test1=B</span>
        </ABTest>
      </>
    )

    const WrappedApp = withABTestsProvider(App, abTests)

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>
    )

    expect(container.textContent).toEqual('test1=A')
  })

  it('should wrap component with context data when passing abTest as function', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B',
    }
    type Props = {
      tests: Tests
    }
    const App: React.FC<Props> = ({ children }) => <div>{children}</div>

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A</span>
        </ABTest>
        <ABTest name="test1" variant="B">
          <span>test1=B</span>
        </ABTest>
      </>
    )

    const abTestsSelector = (props: Props) => props.tests
    const WrappedApp = withABTestsProvider(App, abTestsSelector)

    const { container } = render(
      <WrappedApp tests={abTests}>
        <UnderTest />
      </WrappedApp>
    )

    expect(container.textContent).toEqual('test1=A')
  })
})
