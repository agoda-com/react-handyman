import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as FeatureToggleJsx from '../src/index';

type CustomFeatureConfig = {
  someFeat: {
    someCustomField: number,
  },
  anotherFeat: {
    itsOver: number
  }
}

const {
  FeaturesProvider,
  useFeatures
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('useFeatures', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should return isEnabled for specific feature from context', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return <span>someFeat.someCustomField={`${features.someFeat.someCustomField}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('someFeat.someCustomField=10');
  });
});
