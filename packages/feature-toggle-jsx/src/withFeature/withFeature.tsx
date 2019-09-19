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
  isEnabled: (feature: TFeatureConfig[TFeatureName]) => boolean = (_) => _.isEnabled
) => {
  const Wrapped: React.FC<TOrigProps> = React.memo((props) => {
    const [enabled] = useFeature(featureName, isEnabled);

    if (enabled) return <Component {...props} />;

    return null;
  });

  Wrapped.displayName = `withFeature[${featureName}](${nameOf(Component)})`;
  return Wrapped;
};

export default withFeature;


/* eslint-disable react/jsx-props-no-spreading */
// import * as React from 'react';
// import useFeatures from '../useFeatures/useFeatures';
// import { nameOf } from '../react-utils';
// import { FeatureSchema } from '../FeaturesContext/FeaturesContext';
// // Need this to land in TypeScript first for better type inference
// // Link: https://github.com/Microsoft/TypeScript/issues/26242

// const withFeature = <T, TComponentProps = {}, K extends keyof FeatureSchema<T> = keyof FeatureSchema<T>>(
//   Component: React.ComponentType<TComponentProps>,
//   name: K,
//   isValidFeatureDetail: (feature: Exclude<FeatureSchema<T>[K], undefined | {}>) => boolean = () => true,
// ) => {
//   type OwnProps = Omit<TComponentProps, K>

//   const Wrapped: React.FC<OwnProps> = React.memo((props) => {
//     const [feature] = useFeatures<T, K>(name);

//     if (!feature) {
//       return null;
//     }
//     type featureType = Exclude<FeatureSchema<T>[K], undefined | {}>
//     const featureDetail = feature as featureType;
//     const isValid = featureDetail && isValidFeatureDetail(featureDetail);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return isValid ? <Component {...(props as any)} {...{ [name]: feature }} /> : null;
//   });

//   Wrapped.displayName = `withFeature[${name}](${nameOf(Component)})`;
//   return Wrapped;
// };

// export default withFeature;
