import * as React from 'react';
import FeaturesContext, { FeatureConfig } from '../FeaturesContext';

export type useFeaturesHook<T extends FeatureConfig> = () => T;

const useFeatures = <T extends FeatureConfig>() => {
  const features = React.useContext(FeaturesContext) as T;
  return features;
};


// import { FeatureSchema } from '../FeaturesContext/FeaturesContext';

// const useFeatures = <T, K extends keyof FeatureSchema<T> = keyof FeatureSchema<T>>(...names: K[]) =>
//   names.map((name) => React.useContext<FeatureSchema<T>>(FeaturesContext)[name]);

export default useFeatures;
