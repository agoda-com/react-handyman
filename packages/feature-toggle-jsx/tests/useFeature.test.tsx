import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as FeatureToggleJsx from '../src/index';

type CustomFeatureFields = {
  someCustomField: boolean,
}
type CustomFeatureConfig = {
  someFeat: FeatureToggleJsx.Feature & CustomFeatureFields
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

  it('should return isEnabled for specific feature from context', () => {
    const featuresConfig: CustomFeatureConfig = {
      someFeat: {
        isEnabled: true,
        someCustomField: false
      }
    };

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('someFeat');
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('someFeat=true');
  });

  it('should return isEnabled for specific feature from context based on selector', () => {
    const featuresConfig: CustomFeatureConfig = {
      someFeat: {
        isEnabled: false,
        someCustomField: true
      }
    };

    const UnderTest: React.FC = () => {
      const [isEnabled] = useFeature('someFeat', (_) => _.someCustomField);
      return <span>someFeat={`${isEnabled}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('someFeat=true');
  });

  it('should return feature config for selected feature.', () => {
    const featuresConfig: CustomFeatureConfig = {
      someFeat: {
        isEnabled: false,
        someCustomField: true
      }
    };

    const UnderTest: React.FC = () => {
      const [enabled, config] = useFeature('someFeat', (_) => _.someCustomField);
      return <span>{`enabled:${enabled},config.isEnabled:${config.isEnabled},config.someCustomField:${config.someCustomField}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('enabled:true,config.isEnabled:false,config.someCustomField:true');
  });

  it('should enabled == false & default empty config for non-existing feature', () => {
    const featuresConfig = {
      someFeat: {
        isEnabled: false,
        someCustomField: true
      }
    };

    const UnderTest: React.FC = () => {
      const [enabled, config] = useFeature('someFeat2' as keyof CustomFeatureConfig, (_) => _.someCustomField);
      return <span>{`enabled:${enabled},config.isEnabled:${config.isEnabled},config.someCustomField:${config.someCustomField}`}</span>;
    };

    const { container } = render(
      <FeaturesProvider features={featuresConfig}>
        <UnderTest />
      </FeaturesProvider>,
    );

    expect(container.textContent).toEqual('enabled:false,config.isEnabled:false,config.someCustomField:undefined');
  });
});
