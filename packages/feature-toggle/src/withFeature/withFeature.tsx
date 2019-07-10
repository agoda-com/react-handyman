import * as React from 'react'
import useFeature from '../useFeatures/useFeature'
import { nameOf } from '../react-utils'

// Need this to land in TypeScript first for better type inference
// Link: https://github.com/Microsoft/TypeScript/issues/26242
const withFeature = <T extends object, TComponentProps = {}>(
  Component: React.ComponentType<TComponentProps>,
  name: keyof T
) => {
  type OwnProps = Omit<TComponentProps, keyof T>

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const feature = useFeature<T>()[name]

    return feature ? <Component {...props as any} {...{ [name]: feature }} /> : null
  })

  Wrapped.displayName = `withFeature[${name}](${nameOf(Component)})`
  return Wrapped
}

export default withFeature
