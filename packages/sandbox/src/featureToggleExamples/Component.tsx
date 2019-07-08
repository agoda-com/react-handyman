import * as React from 'react'
import { withFeature } from 'zz-feature-toggle'

const Component: React.FC<{}> = () => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>You should see this</span>
    </p>
  </>
)

const WrappedComponent = withFeature(Component, 'myFeature')

export { WrappedComponent }

export default Component
