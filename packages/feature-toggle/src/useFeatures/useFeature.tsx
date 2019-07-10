import * as React from 'react'
import FeaturesContext from '../FeaturesContext'

const useFeatures = <T extends object>() => React.useContext<T>(FeaturesContext)

export default useFeatures
