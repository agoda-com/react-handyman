import * as React from 'react'

export type FeatureSchema<T> = { [K in keyof T]?: T[K] }

const FeaturesContext = React.createContext<any>({})

export default FeaturesContext
