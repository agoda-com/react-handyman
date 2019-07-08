import * as React from 'react'
import FeaturesContext, { Features } from '../FeaturesContext'

const useFeatures = (feature: string) => {
  const featuresCtx = React.useContext(FeaturesContext)

  return featuresCtx[feature] as Features | undefined
}

export default useFeatures
