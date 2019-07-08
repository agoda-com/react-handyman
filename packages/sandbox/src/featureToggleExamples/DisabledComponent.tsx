import * as React from 'react'
import { withFeature } from 'zz-feature-toggle'

const Component: React.FC<{}> = () => (
  <>
    <p>
      <strong>My Hidden Component</strong>
      <br />
      <span>You should not see this</span>
    </p>
  </>
)

const WrappedComponent = withFeature(Component, 'notMyFeature')

export { WrappedComponent }

export default Component
