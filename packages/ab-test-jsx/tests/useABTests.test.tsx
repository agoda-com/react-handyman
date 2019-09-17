import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as ABTestJsx from '../src/index';

type Tests = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const { useABTests, ABTestsProvider } = ABTestJsx as ABTestJsx.ABTestsModule<Tests>;

describe('useABTests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should return A variant if named tests is A', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { getVariant } = useABTests();
      return <span>test1={getVariant('test1')}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=A');
  });

  it('should return B variant if named tests is B', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { getVariant } = useABTests();
      return <span>test2={getVariant('test2')}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test2=B');
  });

  it('isB should return false if test is A', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isB } = useABTests();
      return <span>{`isB:${isB('test1')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isB:false');
  });

  it('isB should return false if test is Z', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isB } = ABTestJsx.useABTests();
      return <span>{`isB:${isB('test3')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isB:false');
  });

  it('isB should return true if test is B', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isB } = useABTests();
      return <span>{`isB:${isB('test2')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isB:true');
  });

  it('isA should return true if test is A', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isA } = useABTests();
      return <span>{`isA:${isA('test1')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isA:true');
  });

  it('isA should return false if test is B', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isA } = useABTests();
      return <span>{`isA:${isA('test2')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isA:false');
  });

  it('isA should return false if test is Z', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { isA } = ABTestJsx.useABTests();
      return <span>{`isA:${isA('test4')}`}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('isA:false');
  });

  it('getVariant should return Z when experiment is not allocated in context', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => {
      const { getVariant } = ABTestJsx.useABTests();
      return <span>getVariant:{getVariant('test3')}</span>;
    };

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('getVariant:Z');
  });
});
