import * as React from 'react'
import { withoutFeature } from 'feature-toggle-jsx'
import { Features } from '../types'

const MyOtherFeatureComponent: React.FC<{}> = () => (
  <>
    <p>
      <strong>My Special Component</strong>
      <br />
      <span>You should see this when it's disabled !?</span>
    </p>
  </>
)

const WrappedComponent = withoutFeature<Features>(MyOtherFeatureComponent, 'myOtherFeature')

export { WrappedComponent }

export default MyOtherFeatureComponent
