import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as FeatureToggleJsx from '../src/index';

interface CustomFeatureConfig extends FeatureToggleJsx.FeatureConfig {
  someFeat: FeatureToggleJsx.Feature
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
    const featuresConfig: CustomFeatureConfig = {
      someFeat: {
        isEnabled: true
      }
    };

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return <span>someFeat={`${features.someFeat.isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('someFeat=true');
  });
});
