import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as ABTestJsx from '../src/index';

type Tests = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const { withABTest, ABTestsProvider } = ABTestJsx as ABTestJsx.ABTestsModule<Tests>;

const AVariant: React.FC<{ aVariantText: string }> = ({ aVariantText }) => <span>{aVariantText}</span>;
const BVariant: React.FC<{ bVariantText: string }> = ({ bVariantText }) => <span>{bVariantText}</span>;

const ABTestComponent1 = withABTest(AVariant, BVariant, 'test1');
const ABTestComponent2 = withABTest(AVariant, BVariant, 'test2');

describe('withABTest', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should return only A variant component if test is allocated to A', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTestComponent1 aVariantText="test1=A" bVariantText="test2=B" />
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test1=A');
  });

  it('should return only B variant component if test is allocated to B', () => {
    const abTests: Tests = {
      test1: 'A',
      test2: 'B'
    };

    const UnderTest: React.FC = () => (
      <>
        <ABTestComponent2 aVariantText="test1=A" bVariantText="test2=B" />
      </>
    );

    const { container } = render(
      <ABTestsProvider abTests={abTests}>
        <UnderTest />
      </ABTestsProvider>,
    );

    expect(container.textContent).toEqual('test2=B');
  });
});
