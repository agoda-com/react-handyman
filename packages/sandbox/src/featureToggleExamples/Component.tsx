import * as React from 'react'
import { withFeature } from 'zz-feature-toggle'
import { Features } from './types'

interface Props {}

const Component: React.FC<Props> = () => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>You should see this</span>
    </p>
  </>
)

const WrappedComponent = withFeature<Props, Features, 'myFeature'>(Component, 'myFeature')

export { WrappedComponent }

export default Component
