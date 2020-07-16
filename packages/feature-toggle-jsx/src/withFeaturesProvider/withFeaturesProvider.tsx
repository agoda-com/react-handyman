/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FeatureConfig } from '../FeaturesContext';
import FeaturesProvider from '../FeaturesProvider';
import { nameOf } from '../react-utils';

export type withFeaturesProviderHoC<T extends FeatureConfig> = <TProps extends {}>(
  Component: React.ComponentType<TProps>,
  features: T | FeaturesSetter<TProps, T>
) => React.FunctionComponent<TProps>

type FeaturesSetter<TProps extends {}, T> = (componentProps: TProps) => T

const withFeaturesProvider = <T extends FeatureConfig, TProps extends {}>(
  Component: React.ComponentType<TProps>,
  features: FeaturesSetter<TProps, T> | T
) => {
  const Wrapped: React.FC<TProps> = React.memo((props) => {
    const values = typeof features === 'function' ? features(props) : features;
    return (
      <FeaturesProvider features={values}>
        <Component {...props} />
      </FeaturesProvider>
    );
  });

  Wrapped.displayName = `withFeaturesProvider(${nameOf(Component)})`;
  return Wrapped;
};

export default withFeaturesProvider;
