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
  withFeaturesProvider,
  useFeatures
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('withFeaturesProvider', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should wrap component with context data when passing features as value', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const App: React.FC = ({ children }) => <div>{children}</div>;

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return (
        <span>{`${features.someFeat.someCustomField}`}</span>
      );
    };

    const WrappedApp = withFeaturesProvider(App, featuresConfig);

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('10');
  });

  it('should wrap component with context data when passing features as function', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    type Props = {
      feats: CustomFeatureConfig
    }
    const App: React.FC<Props> = ({ children }) => <div>{children}</div>;

    const UnderTest: React.FC = () => {
      const features = useFeatures();
      return (
        <span>{`${features.someFeat.someCustomField}`}</span>
      );
    };

    const featuresSelector = (props: Props) => props.feats;
    const WrappedApp = withFeaturesProvider(App, featuresSelector);

    const { container } = render(
      <WrappedApp feats={featuresConfig}>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('10');
  });
});
