import * as React from 'react'
import FeaturesContext from '../FeaturesContext'

interface Props {
  features: any
}

const FeaturesProvider: React.FC<Props> = React.memo(props => {
  const { features, children } = props

  return <FeaturesContext.Provider value={features}>{children}</FeaturesContext.Provider>
})

FeaturesProvider.displayName = 'FeaturesProvider'
export default FeaturesProvider
