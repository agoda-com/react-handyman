import * as React from 'react'

export type FeatureSchema<T> = { [K in keyof T]?: T[K] }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeaturesContext = React.createContext<any>({})

export default FeaturesContext
