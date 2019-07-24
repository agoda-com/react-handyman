import * as React from 'react'
import FeaturesContext from '../FeaturesContext'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

const FeaturesProvider = React.memo(
  <T extends {}>({ features, children }: { features: FeatureSchema<T>; children: React.ReactNode }) => (
    <FeaturesContext.Provider value={features}>{children}</FeaturesContext.Provider>
  )
)

FeaturesProvider.displayName = 'FeaturesProvider'
export default FeaturesProvider
