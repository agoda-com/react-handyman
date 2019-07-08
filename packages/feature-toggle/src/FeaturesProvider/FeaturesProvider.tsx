import * as React from 'react'
import FeaturesContext, { Features } from '../FeaturesContext'

interface Props {
  features: Features
}

const FeaturesProvider: React.FC<Props> = React.memo(props => {
  const { features, children } = props
  return <FeaturesContext.Provider value={features}>{children}</FeaturesContext.Provider>
})

FeaturesProvider.displayName = 'FeaturesProvider'

export default FeaturesProvider
