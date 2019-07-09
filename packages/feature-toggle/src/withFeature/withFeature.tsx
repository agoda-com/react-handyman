import * as React from 'react'
import useFeature from '../useFeature/useFeature'
import { nameOf } from '../react-utils'

// Need this to land in TypeScript first for better type inference
// Link: https://github.com/Microsoft/TypeScript/issues/26242
const withFeature = <TFeatures, TComponentProps = {}>(
  Component: React.ComponentType<TComponentProps>,
  name: keyof TFeatures
) => {
  type TName = keyof TFeatures
  type OwnProps = Omit<TComponentProps, keyof TFeatures[TName]>

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const feature = useFeature<TFeatures, keyof TFeatures>(name)

    return feature ? <Component {...props as TComponentProps} {...feature} /> : null
  })

  Wrapped.displayName = `withFeature[${name}](${nameOf(Component)})`
  return Wrapped
}

export default withFeature
