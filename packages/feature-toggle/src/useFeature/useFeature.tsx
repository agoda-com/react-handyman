import * as React from 'react'
import FeaturesContext, { Features } from '../FeaturesContext'

const useFeatures = <TFeatures, K extends keyof TFeatures>(feature: K) => {
  const featuresCtx = React.useContext<TFeatures>(FeaturesContext)

  return featuresCtx[feature]
}

export default useFeatures
