import * as React from 'react'
import { withFeature } from 'feature-toggle-jsx'
import { Features, Config } from './types'

interface Props {
  myFeatureWithConfig: Config
}

const MyFeatureComponentWithConfig: React.FC<Props> = ({ myFeatureWithConfig: { items } }) => (
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

const WrappedComponentWithConfig = withFeature<Features, Props>(MyFeatureComponentWithConfig, 'myFeatureWithConfig')

export { WrappedComponentWithConfig }

export default MyFeatureComponentWithConfig
