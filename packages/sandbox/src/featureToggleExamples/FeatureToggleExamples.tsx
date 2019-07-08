import * as React from 'react'
import { withFeaturesProvider } from 'zz-feature-toggle'
import { WrappedComponent } from './Component'
import { WrappedComponent as DisabledComponent } from './DisabledComponent'

const features = {
  myFeature: { someExtraConfig: ['a', 'b'] },
}

const FeatureToggleExamples: React.FC = () => {
  return (
    <>
      <WrappedComponent />
      <DisabledComponent />
    </>
  )
}

export default withFeaturesProvider(FeatureToggleExamples, features)
