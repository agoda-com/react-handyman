import * as React from 'react'
import { withFeature } from 'feature-toggle-jsx'
import { Features, Config } from '../types'

interface Props {
  // injected config from feature
  myFeatureWithConfig: Config

  // own props
  text: string
  number: number
}

const MyFeatureComponentWithConfig: React.FC<Props> = ({ myFeatureWithConfig: { items }, text, number }) => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>
        You should see this {text} and {number}
      </span>
      <br />
      <span>{`with this configuration "${items.join(', ')}"`}</span>
    </p>
  </>
)

const WrappedComponentWithConfig = withFeature<Features, Props>(MyFeatureComponentWithConfig, 'myFeatureWithConfig')

export { WrappedComponentWithConfig }

export default MyFeatureComponentWithConfig
