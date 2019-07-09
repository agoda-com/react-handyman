import * as React from 'react'
import { withFeature } from 'zz-feature-toggle'
import { Features } from './types'

interface Props {
  items: string[]
}

const Component: React.FC<Props> = ({ items }) => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>You should see this</span>
      <br />
      <span>with this configuration "{items.join(', ')}"</span>
    </p>
  </>
)

const WrappedComponentWithConfig = withFeature<Props, Features, 'myFeatureWithConfig'>(Component, 'myFeatureWithConfig')

export { WrappedComponentWithConfig }

export default Component
