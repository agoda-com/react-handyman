import * as React from 'react'
import { withFeature } from 'feature-toggle-jsx'
import { Features } from './types'

interface Props {
  text: string
}

const MyFeatureComponent: React.FC<Props> = ({ text }) => (
  <>
    <p>
      <strong>My Component</strong>
      <br />
      <span>You should see this {text}</span>
    </p>
  </>
)

const WrappedComponent = withFeature<Features, Props>(MyFeatureComponent, 'myFeature')

export { WrappedComponent }

export default MyFeatureComponent
