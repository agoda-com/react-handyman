import * as React from 'react'
import { withFeaturesProvider } from 'zz-feature-toggle'

import { WrappedComponent } from './Component'
import { WrappedComponentWithConfig } from './ComponentWithConfiguration'
import { WrappedComponent as DisabledComponent } from './DisabledComponent'
import { Features } from './types'

const features: Partial<Features> = {
  myFeature: {},
  myFeatureWithConfig: { items: ['this', 'is', 'my', 'example', 'config', 'items'] },
}

const FeatureToggleExamples: React.FC = () => {
  return (
    <>
      <WrappedComponent />
      <DisabledComponent />
      <WrappedComponentWithConfig />
    </>
  )
}

FeatureToggleExamples.displayName = 'FeatureToggleExamples'
export default withFeaturesProvider(FeatureToggleExamples, features)
