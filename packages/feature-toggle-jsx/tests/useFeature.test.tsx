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
  useFeature
} = FeatureToggleJsx as FeatureToggleJsx.FeatureToggleModule<CustomFeatureConfig>;

describe('useFeature', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should return isEnabled == true for specific feature from context that exists', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('someFeat');
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('someFeat=true');
  });

  it('should return isEnabled == false for specific feature from context that doesnt exists', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('anotherFeat');
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('someFeat=false');
  });

  it('should return isEnabled == false for specific feature from context based on selector', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('someFeat', (_) => _.someCustomField === 10);
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('someFeat=true');
  });

  it('should return isEnabled == false for specific feature from context based on selector when feature doesnt exits', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('anotherFeat', (_) => _.itsOver === 9000);
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('someFeat=false');
  });

  it('should return feature config for selected feature.', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [enabled, config] = useFeature('someFeat', (_) => _.someCustomField === 10);
      return <span>{`enabled:${enabled},config.someCustomField:${config.someCustomField}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('enabled:true,config.someCustomField:10');
  });

  it('should enabled == false & default empty config for non-existing feature', () => {
    const featuresConfig = {
      someFeat: {
        someCustomField: 10
      }
    } as CustomFeatureConfig;

    const UnderTest: React.FC = () => {
      const [enabled, config] = useFeature('anotherFeat', (_) => _.itsOver > 9000);
      return <span>{`enabled:${enabled},config.itsOver:${config.itsOver}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>
    );

    expect(container.textContent).toEqual('enabled:false,config.itsOver:undefined');
  });
});
