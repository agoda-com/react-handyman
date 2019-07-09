import * as React from 'react'
import useFeature from '../useFeature/useFeature'
import { nameOf } from '../react-utils'

const withFeature = <TComponentProps, TFeatures, TName extends keyof TFeatures>(
  Component: React.ComponentType<TComponentProps>,
  featureName: TName
) => {
  type OwnProps = Omit<TComponentProps, keyof TFeatures[TName]>

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const feature = useFeature<TFeatures, TName>(featureName)

    return feature ? <Component {...props as TComponentProps} {...feature} /> : null
  })

  Wrapped.displayName = `withFeature[${featureName}](${nameOf(Component)})`
  return Wrapped
}

export default withFeature
