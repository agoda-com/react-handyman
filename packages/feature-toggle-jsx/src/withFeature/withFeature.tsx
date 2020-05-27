/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FeatureConfig } from '../FeaturesContext';
import useFeature from '../useFeature';
import { nameOf } from '../react-utils';

export type withFeatureHoC<TFeatureConfig extends FeatureConfig> = <
  TOrigProps extends {},
  TFeatureName extends Extract<keyof TFeatureConfig, string | number>
>(
  Component: React.ComponentType<TOrigProps>,
  featureName: TFeatureName,
  isEnabled?: (feature: TFeatureConfig[TFeatureName]) => boolean
) => React.FC<TOrigProps>;

const withFeature = <
  TOrigProps extends {},
  TFeatureConfig extends FeatureConfig,
  TFeatureName extends Extract<keyof TFeatureConfig, string | number>
>(
  Component: React.ComponentType<TOrigProps>,
  featureName: TFeatureName,
  isEnabled: (feature: TFeatureConfig[TFeatureName]) => boolean = (_) => !!_
) => {
  const Wrapped: React.FC<TOrigProps> = React.memo((props) => {
    const [enabled, features] = useFeature(featureName, isEnabled);

    if (enabled) return <Component {...props} {...{ [featureName]: features }} />;

    return null;
  });

  Wrapped.displayName = `withFeature[${featureName}](${nameOf(Component)})`;
  return Wrapped;
};

export default withFeature;
