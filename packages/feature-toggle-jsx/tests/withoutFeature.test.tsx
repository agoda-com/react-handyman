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
  withoutFeature
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('withoutFeature', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should only render wrapped component when feature is off', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const App: React.FC = ({ children }) => <div>{children}</div>;
    const Feat1: React.FC = () => <span>This is feature 1</span>;
    const Feat2: React.FC = () => <span>This is feature 2</span>;

    const WrappedFeat1 = withoutFeature(Feat1, 'someFeat');
    const WrappedFeat2 = withoutFeature(Feat2, 'anotherFeat');

    const UnderTest: React.FC = () => (
      <><WrappedFeat1 /><WrappedFeat2 /></>
    );

    const WrappedApp = withFeaturesProvider(App, featuresConfig);

    const { container } = render(
      <WrappedApp>
        <UnderTest />
      </WrappedApp>,
    );

    expect(container.textContent).toEqual('This is feature 2');
  });

  it('should enable using custom selector from feature config', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const App: React.FC = ({ children }) => <div>{children}</div>;
    const Feat1: React.FC = () => <span>This is feature 1</span>;
    const Feat2: React.FC = () => <span>This is feature 2</span>;

    const WrappedFeat1 = withoutFeature(Feat1, 'someFeat', (_) => _.someCustomField !== 10);
    const WrappedFeat2 = withoutFeature(Feat2, 'someFeat');

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
