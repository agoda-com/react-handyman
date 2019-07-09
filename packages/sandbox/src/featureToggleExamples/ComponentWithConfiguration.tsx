import * as React from 'react'
import { withFeature } from 'feature-toggle-jsx'
import { Features } from './types'

interface Props {
  items: string[]
}

const MyFeatureComponentWithConfig: React.FC<Props> = ({ items }) => (
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

const WrappedComponentWithConfig = withFeature<Props, Features, 'myFeatureWithConfig'>(
  MyFeatureComponentWithConfig,
  'myFeatureWithConfig'
)

export { WrappedComponentWithConfig }

export default MyFeatureComponentWithConfig
