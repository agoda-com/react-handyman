import * as React from 'react'
import useFeatures from '../useFeatures/useFeatures'
import { nameOf } from '../react-utils'
import { FeatureSchema } from '../FeaturesContext/FeaturesContext'

// Need this to land in TypeScript first for better type inference
// Link: https://github.com/Microsoft/TypeScript/issues/26242
const withFeature = <T, TComponentProps = {}, K extends keyof FeatureSchema<T> = any>(
  Component: React.ComponentType<TComponentProps>,
  name: K
) => {
  type OwnProps = Omit<TComponentProps, K>

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const [feature] = useFeatures<T, K>(name)

    return feature ? <Component {...props as any} {...{ [name]: feature }} /> : null
  })

  Wrapped.displayName = `withFeature[${name}](${nameOf(Component)})`
  return Wrapped
}

export default withFeature
