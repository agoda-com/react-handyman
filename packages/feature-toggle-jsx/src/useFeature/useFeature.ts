import useFeatures from '../useFeatures';
import { FeatureConfig } from '../FeaturesContext';

export type useFeatureHook<
  TFeatureConfig extends FeatureConfig,
> = <TFeatureName extends Extract<keyof TFeatureConfig, string | number>>(
  featureName: TFeatureName,
  isEnabled?: (feature: TFeatureConfig[TFeatureName]) => boolean
) => [boolean, TFeatureConfig[TFeatureName]];

const useFeature = <
  TFeatureConfig extends FeatureConfig,
  TFeatureName extends Extract<keyof TFeatureConfig, string | number>
>(
  featureName: TFeatureName,
  isEnabled: (feature: TFeatureConfig[TFeatureName]) => boolean = (_) => _.isEnabled
): [boolean, TFeatureConfig[TFeatureName]] => {
  const features = useFeatures<TFeatureConfig>();

  const feature = features[featureName];
  if (!feature) return [false, { isEnabled: false } as TFeatureConfig[TFeatureName]];

  return [
    isEnabled(feature),
    feature
  ];
};

export default useFeature;
