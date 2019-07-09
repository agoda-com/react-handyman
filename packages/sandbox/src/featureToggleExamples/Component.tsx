import * as React from 'react'
import { withFeature } from 'feature-toggle-jsx'
import { Features } from './types'

interface Props {}

const MyFeatureComponent: React.FC<Props> = () => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>You should see this</span>
    </p>
  </>
)

const WrappedComponent = withFeature<Features>(MyFeatureComponent, 'myFeature')

export { WrappedComponent }

export default MyFeatureComponent
