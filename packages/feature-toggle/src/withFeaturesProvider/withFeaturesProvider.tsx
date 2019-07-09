import * as React from 'react'
import { Features } from '../FeaturesContext'
import FeaturesProvider from '../FeaturesProvider'

const withFeaturesProvider = <TComponentProps, TFeatures>(
  Component: React.ComponentType<TComponentProps>,
  features: TFeatures
) => {
  const Wrapped: React.FC<TComponentProps> = React.memo(props => {
    return (
      <FeaturesProvider features={features}>
        <Component {...props} />
      </FeaturesProvider>
    )
  })

  Wrapped.displayName = `withFeaturesProvider(${Component.displayName})`
  return Wrapped
}

export default withFeaturesProvider
