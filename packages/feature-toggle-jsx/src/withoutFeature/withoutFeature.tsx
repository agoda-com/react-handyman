import * as React from 'react'
import useFeatures from '../useFeatures/useFeatures'
import { nameOf } from '../react-utils'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

// Need this to land in TypeScript first for better type inference
// Link: https://github.com/Microsoft/TypeScript/issues/26242
const withoutFeature = <T, TComponentProps = {}, K extends keyof FeatureSchema<T> = keyof FeatureSchema<T>>(
  Component: React.ComponentType<TComponentProps>,
  name: K
) => {
  const Wrapped: React.FC<TComponentProps> = React.memo(props => {
    const [feature] = useFeatures<T, K>(name)

    return !feature ? <Component {...props} /> : null
  })

  Wrapped.displayName = `withoutFeature[${name}](${nameOf(Component)})`
  return Wrapped
}

export default withoutFeature
