import * as React from 'react'
import FeaturesContext from '../FeaturesContext'

const useFeatures = <TFeatures extends Object, K extends keyof TFeatures>(feature: K) => {
  const featureCtx = React.useContext<TFeatures>(FeaturesContext)

  if (featureCtx.hasOwnProperty(feature)) {
    return featureCtx[feature] || {}
  } else {
    return undefined
  }
}

export default useFeatures
