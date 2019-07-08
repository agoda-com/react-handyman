import * as React from 'react'
import useFeature from '../useFeature/useFeature'

const withFeature = <TProps extends {}>(Component: React.ComponentType<TProps>, featureName: string) => {
  const Wrapped: React.FC<TProps> = React.memo(props => {
    const feature = useFeature(featureName)
    return feature ? <Component {...props as TProps} /> : null
  })

  Wrapped.displayName = `with${featureName}(${Component.displayName})`
  return Wrapped
}

export default withFeature
