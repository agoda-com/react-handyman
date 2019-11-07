import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as ABTestJsx from '../src/index';

type Tests = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const { ABTest, ABTestsProvider } = ABTestJsx as ABTestJsx.ABTestsModule<Tests>;

describe('ABTest', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('if test is evaluated as A, should render only A variant children', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A</span>
        </ABTest>
        <ABTest name="test1" variant="B">
          <span>test1=B</span>
        </ABTest>
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=A');
  });

  it('if test is evaluated as B, should render only B variant children', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test2" variant="A">
          <span>test2=A</span>
        </ABTest>
        <ABTest name="test2" variant="B">
          <span>test2=B</span>
        </ABTest>
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test2=B');
  });

  it('should render correct variants for multiple experiments', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A,</span>
        </ABTest>
        <ABTest name="test1" variant="B">
          <span>test1=B,</span>
        </ABTest>
        <ABTest name="test2" variant="A">
          <span>test2=A,</span>
        </ABTest>
        <ABTest name="test2" variant="B">
          <span>test2=B</span>
        </ABTest>
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=A,test2=B');
  });

  it('should render A variant if experiment cannot be evaluated (A default)', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A</span>
        </ABTest>
        <ABTestJsx.ABTest name="test3" variant="A">
          <span>test3(not-allocated)=A</span>
        </ABTestJsx.ABTest>
        <ABTestJsx.ABTest name="test3" variant="B">
          <span>test3(not-allocated)=B</span>
        </ABTestJsx.ABTest>
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=Atest3(not-allocated)=A');
  });
  it('should not render A nor B variant if experiment cannot be evaluated (Z)', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTest name="test1" variant="A">
          <span>test1=A</span>
        </ABTest>
        <ABTestJsx.ABTest name="test3" variant="A">
          <span>test3(not-allocated)=B</span>
        </ABTestJsx.ABTest>
        <ABTestJsx.ABTest name="test3" variant="B">
          <span>test3(not-allocated)=B</span>
        </ABTestJsx.ABTest>
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests} defaultVariant="Z">
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=A');
  });
});
