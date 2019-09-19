import * as React from 'react';
import FeaturesContext, { FeatureConfig } from '../FeaturesContext';

export type useFeaturesHook<T extends FeatureConfig> = () => T;

const useFeatures = <T extends FeatureConfig>() => {
  const features = React.useContext(FeaturesContext) as T;
  return features;
};

export default useFeatures;
