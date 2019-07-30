import * as React from 'react'
import FeaturesProvider from '../FeaturesProvider'
import { nameOf } from '../react-utils'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

const withFeaturesProvider = <TComponentProps, TFeature>(
  Component: React.ComponentType<TComponentProps>,
  featuresSelector: (props:TComponentProps) => FeatureSchema<TFeature>
) => {
  const Wrapped: React.FC<TComponentProps> = React.memo(props => {
    return (
      <FeaturesProvider features={featuresSelector(props)}>
        <Component {...props} />
      </FeaturesProvider>
    )
  })

  Wrapped.displayName = `withFeaturesProvider(${nameOf(Component)})`
  return Wrapped
}

export default withFeaturesProvider
