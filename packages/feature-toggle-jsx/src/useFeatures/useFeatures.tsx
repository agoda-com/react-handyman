import * as React from 'react'
import FeaturesContext from '../FeaturesContext'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

const useFeatures = <T, K extends keyof FeatureSchema<T> = keyof FeatureSchema<T>>(...names: K[]) =>
  names.map(name => React.useContext<FeatureSchema<T>>(FeaturesContext)[name])

export default useFeatures
