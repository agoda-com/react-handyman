import { FeatureConfig } from './FeaturesContext';
import { FeaturesProviderComponent } from './FeaturesProvider';
import { useFeaturesHook } from './useFeatures';
import { withFeatureHoC } from './withFeature';
import { withFeaturesProviderHoC } from './withFeaturesProvider';

export { default as FeaturesProvider } from './FeaturesProvider';
export { default as useFeatures } from './useFeatures';
export { default as withFeature } from './withFeature';
export { default as withFeaturesProvider } from './withFeaturesProvider';


export * from './FeaturesContext/featureConfig';
export interface FeatureToggleModule<T extends FeatureConfig> {
  FeaturesProvider: FeaturesProviderComponent<T>
  useFeatures: useFeaturesHook<T>,
  withFeature: withFeatureHoC<T>
  withFeaturesProvider: withFeaturesProviderHoC<T>
}
