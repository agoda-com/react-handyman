/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FeatureConfig } from '../FeaturesContext';
import useFeature from '../useFeature';
import { nameOf } from '../react-utils';

export type withoutFeatureHoC<TFeatureConfig extends FeatureConfig> = <
  TOrigProps extends {},
  TFeatureName extends Extract<keyof TFeatureConfig, string | number>
>(
  Component: React.ComponentType<TOrigProps>,
  featureName: TFeatureName,
  isEnabled?: (feature: TFeatureConfig[TFeatureName]) => boolean
) => React.FC<TOrigProps>;

const withoutFeature = <
  TOrigProps extends {},
  TFeatureConfig extends FeatureConfig,
  TFeatureName extends Extract<keyof TFeatureConfig, string | number>
>(
  Component: React.ComponentType<TOrigProps>,
  featureName: TFeatureName,
  isEnabled: (feature: TFeatureConfig[TFeatureName]) => boolean = (_) => _.isEnabled
) => {
  const Wrapped: React.FC<TOrigProps> = React.memo((props) => {
    const [enabled] = useFeature(featureName, isEnabled);

    if (!enabled) return <Component {...props} />;

    return null;
  });

  Wrapped.displayName = `withoutFeature[${featureName}](${nameOf(Component)})`;
  return Wrapped;
};

export default withoutFeature;
