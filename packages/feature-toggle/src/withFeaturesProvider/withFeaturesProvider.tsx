import * as React from 'react'
import { Features } from '../FeaturesContext'
import FeaturesProvider from '../FeaturesProvider'

const withFeaturesProvider = <TProps extends {}>(Component: React.ComponentType<TProps>, features: Features) => {
  const Wrapped: React.FC<TProps> = React.memo(props => {
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
