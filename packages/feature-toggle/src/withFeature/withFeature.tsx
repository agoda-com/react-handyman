import * as React from 'react'
import useFeature from '../useFeature/useFeature'

const withFeature = <TComponentProps, TFeatures, TName extends keyof TFeatures>(
  Component: React.ComponentType<TComponentProps>,
  featureName: TName
) => {
  type OwnProps = Omit<TComponentProps, keyof TFeatures[TName]>

  const Wrapped: React.FC<OwnProps> = React.memo(props => {
    const feature = useFeature<TFeatures, TName>(featureName)

    return feature ? <Component {...props as TComponentProps} {...feature} /> : null
  })

  // displayName will be undefined when `Component` is a functional component
  const componentName = Component.displayName || Component.name

  Wrapped.displayName = `withFeature[${featureName}](${componentName})`
  return Wrapped
}

export default withFeature
