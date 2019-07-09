import 'jest'
import * as React from 'react'
import { render, cleanup, getNodeText } from '@testing-library/react'

import FeatureProvider from '../src/FeaturesProvider'
import withFeature from '../src/withFeature'
import { Features, features } from './mock'

const componentText = 'I am component.'
const configText = (items: string[]) => `Config: [${items.join(', ')}].`

const NoConfigComponent: React.FC = _ => <div>{componentText}</div>

interface Props {
  items: string[]
}
const NeedConfigComponent: React.FC<Props> = ({ items }) => (
  <div>
    {componentText} {configText(items)}
  </div>
)

describe('withFeature()', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should render component when feature flag is enabled', () => {
    const Wrapped = withFeature<Features>(NoConfigComponent, 'simpleFeature')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    const innerText = getNodeText(container.querySelector('div'))

    expect(innerText).toEqual(componentText)
  })

  it('should render component when feature flag is enabled but config object is undefined', () => {
    const Wrapped = withFeature<Features>(NoConfigComponent, 'undefinedFeature')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    const innerText = getNodeText(container.querySelector('div'))

    expect(innerText).toEqual(componentText)
  })

  it('should render component with config when feature flag is enabled', () => {
    const Wrapped = withFeature<Features, Props>(NeedConfigComponent, 'featureWithConfig')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    const innerText = getNodeText(container.querySelector('div'))

    expect(innerText).toContain(componentText)
    expect(innerText).toContain(configText(features.featureWithConfig!.items))
  })

  it('should not render component when feature flag is disabled', () => {
    const Wrapped = withFeature<Features>(NoConfigComponent, 'disabledFeature')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    const innerText = getNodeText(container)

    expect(innerText).toBeFalsy()
  })

  it('should not render component with config when feature flag is disabled', () => {
    const Wrapped = withFeature<Features, Props>(NeedConfigComponent, 'disabledFeatureWithConfig')

    expect(() => {
      const { container } = render(
        <FeatureProvider features={features}>
          <Wrapped />
        </FeatureProvider>
      )

      const innerText = getNodeText(container)

      expect(innerText).toBeFalsy()
    }).not.toThrow()
  })
})
