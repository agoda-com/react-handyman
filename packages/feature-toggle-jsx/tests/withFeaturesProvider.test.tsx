import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as FeatureToggleJsx from '../src/index';

interface CustomFeatureConfig extends FeatureToggleJsx.FeatureConfig {
  customFlatFeature: FeatureToggleJsx.Feature
}

const {
  withFeaturesProvider,
  useFeatures
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('withFeaturesProvider', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should wrap component with context data when passing features as value', () => {
    const featuresConfig: CustomFeatureConfig = {
      customFlatFeature: {
        isEnabled: true
      }
    };

    const App: React.FC = ({ children }) => <div>{children}</div>;

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return (
        <span>{`${features.customFlatFeature.isEnabled}`}</span>
      );
    };

    const WrappedApp = withFeaturesProvider(App, featuresConfig);

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('true');
  });

  it('should wrap component with context data when passing features as function', () => {
    const featuresConfig: CustomFeatureConfig = {
      customFlatFeature: {
        isEnabled: true
      }
    };
    type Props = {
      feats: CustomFeatureConfig
    }
    const App: React.FC<Props> = ({ children }) => <div>{children}</div>;

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return (
        <span>{`${features.customFlatFeature.isEnabled}`}</span>
      );
    };

    const featuresSelector = (props: Props) => props.feats;
    const WrappedApp = withFeaturesProvider(App, featuresSelector);

    const { container } = render(
      <WrappedApp feats={featuresConfig}>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('true');
  });
});
