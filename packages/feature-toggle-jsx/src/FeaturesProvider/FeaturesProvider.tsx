import * as React from 'react';
import FeaturesContext, { FeatureConfig } from '../FeaturesContext';

interface OwnProps<T> {
  features: T
}

type Props<T> = React.PropsWithChildren<OwnProps<T>>

export type FeaturesProviderComponent<T extends FeatureConfig> = React.FC<Props<T>>

const FeaturesProvider = React.memo(<T extends FeatureConfig>(props: Props<T>) => {
  const { features, children } = props;
  return <FeaturesContext.Provider value={features}>{children}</FeaturesContext.Provider>;
});

FeaturesProvider.displayName = 'FeaturesProvider';

export default FeaturesProvider;
