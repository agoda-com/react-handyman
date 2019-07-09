import * as React from 'react'
import FeaturesContext from '../FeaturesContext'

const useFeatures = <TFeatures, K extends keyof TFeatures>(feature: K) =>
  React.useContext<TFeatures>(FeaturesContext)[feature]

export default useFeatures
