import { FeatureConfig } from './FeaturesContext';
import { FeaturesProviderComponent } from './FeaturesProvider';
import { useFeaturesHook } from './useFeatures';
import { withFeatureHoC } from './withFeature';
import { withFeaturesProviderHoC } from './withFeaturesProvider';
import { withoutFeatureHoC } from './withoutFeature';
import { useFeatureHook } from './useFeature';

export { default as FeaturesProvider } from './FeaturesProvider';
export { default as useFeature } from './useFeature';
export { default as useFeatures } from './useFeatures';
export { default as withFeature } from './withFeature';
export { default as withoutFeature } from './withoutFeature';
export { default as withFeaturesProvider } from './withFeaturesProvider';


export * from './FeaturesContext/featureConfig';
export interface FeatureToggleModule<T extends FeatureConfig> {
  FeaturesProvider: FeaturesProviderComponent<T>,
  useFeature: useFeatureHook<T>,
  useFeatures: useFeaturesHook<T>,
  withFeature: withFeatureHoC<T>,
  withoutFeature: withoutFeatureHoC<T>,
  withFeaturesProvider: withFeaturesProviderHoC<T>
}
