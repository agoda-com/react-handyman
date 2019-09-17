import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as ABTestJsx from '../src/index';

type Tests = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const { withABTests, ABTestsProvider } = ABTestJsx as ABTestJsx.ABTestsModule<Tests>;

describe('withABTests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should decorate component with context data', () => {
    const contextAbTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    type OwnProps = {
      text: string
    }
    type TestProps = {
      abTests: Tests
    }
    const UnderTest: React.FC<OwnProps & TestProps> = ({ text, abTests }) => (
      <>
        <span>{text}</span>
        {abTests.test1 === 'A' && <span>test1=A</span>}
        {abTests.test1 === 'B' && <span>test1=B</span>}
      </>
    );

    const UnderTestWithABTests = withABTests(UnderTest);

    const { container } = render(
      <ABTestsProvider abTests={contextAbTests}>
        <UnderTestWithABTests text="under test - " />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('under test - test1=A');
  });
});
