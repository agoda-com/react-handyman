import * as React from 'react'
import { withFeature } from 'zz-feature-toggle'
import { Features } from './types'

const Component: React.FC<{}> = () => (
  <>
    <p>
      <strong>My Hidden Component</strong>
      <br />
      <span>You should not see this</span>
    </p>
  </>
)

const WrappedComponent = withFeature<{}, Features, 'myOtherFeature'>(Component, 'myOtherFeature')

export { WrappedComponent }

export default Component
