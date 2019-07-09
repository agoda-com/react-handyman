import * as React from 'react'
import useFeature from '../useFeature/useFeature'

const withFeature = <TProps extends {}>(Component: React.ComponentType<TProps>, featureName: string) => {
  const Wrapped: React.FC<TProps> = React.memo(props => {
    const feature = useFeature(featureName)
    return feature ? <Component {...props as TProps} /> : null
  })

  // displayName will be undefined when `Component` is a functional component
  const componentName = Component.displayName || Component.name

  Wrapped.displayName = `withFeature[${featureName}](${componentName})`
  return Wrapped
}

export default withFeature
