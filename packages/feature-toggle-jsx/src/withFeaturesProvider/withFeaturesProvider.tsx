import * as React from 'react'
import FeaturesProvider from '../FeaturesProvider'
import { nameOf } from '../react-utils'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

const withFeaturesProvider = <TComponentProps, TFeature>(
  Component: React.ComponentType<TComponentProps>,
  features: ((props: TComponentProps) => FeatureSchema<TFeature>) | FeatureSchema<TFeature>
) => {
  const Wrapped: React.FC<TComponentProps> = React.memo(props => {
    const featureValues = typeof features === 'function' ? features(props) : features;
    return (
      <FeaturesProvider features={featureValues}>
        <Component {...props} />
      </FeaturesProvider>
    )
  })

  Wrapped.displayName = `withFeaturesProvider(${nameOf(Component)})`
  return Wrapped
}

export default withFeaturesProvider
