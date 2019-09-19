import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as FeatureToggleJsx from '../src/index';

type CustomFeatureFields = {
  someCustomField: boolean,
}

type CustomFeatureConfig = {
  feat1: FeatureToggleJsx.Feature & CustomFeatureFields
  feat2: FeatureToggleJsx.Feature
}

const {
  withFeaturesProvider,
  withFeature
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('withFeature', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should only render wrapped component when feature is on', () => {
    const featuresConfig: CustomFeatureConfig = {
      feat1: {
        isEnabled: true,
        someCustomField: false
      },
      feat2: {
        isEnabled: false
      }
    };

    const App: React.FC = ({ children }) => <div>{children}</div>;
    const Feat1: React.FC = () => <span>This is feature 1</span>;
    const Feat2: React.FC = () => <span>This is feature 2</span>;

    const WrappedFeat1 = withFeature(Feat1, 'feat1');
    const WrappedFeat2 = withFeature(Feat2, 'feat2');

    const UnderTest: React.FC = () => (
      <><WrappedFeat1 /><WrappedFeat2 /></>
    );

    const WrappedApp = withFeaturesProvider(App, featuresConfig);

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('This is feature 1');
  });

  it('should enable using custom selector from feature config', () => {
    const featuresConfig: CustomFeatureConfig = {
      feat1: {
        isEnabled: true,
        someCustomField: true
      },
      feat2: {
        isEnabled: false
      }
    };

    const App: React.FC = ({ children }) => <div>{children}</div>;
    const Feat1: React.FC = () => <span>This is feature 1</span>;
    const Feat2: React.FC = () => <span>This is feature 2</span>;

    const WrappedFeat1 = withFeature(Feat1, 'feat1', (_) => _.someCustomField);
    const WrappedFeat2 = withFeature(Feat2, 'feat2');

    const UnderTest: React.FC = () => (
      <><WrappedFeat1 /><WrappedFeat2 /></>
    );

    const WrappedApp = withFeaturesProvider(App, featuresConfig);

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('This is feature 1');
  });
});
