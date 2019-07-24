import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

import FeatureProvider from '../src/FeaturesProvider'
import withFeature from '../src/withFeature'
import { Features, features, FeatureWithConfig } from './mock'

const componentText = 'I am component.'
const configText = (items: string[]) => `Config: [${(items || []).join(', ')}].`

const NoConfigComponent: React.FC = () => <div>{componentText}</div>

describe('withFeature()', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('render component when feature flag is enabled', () => {
    const Wrapped = withFeature<Features>(NoConfigComponent, 'simpleFeature')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    expect(container.textContent).toEqual(componentText)
  })

  it('render component with config when feature flag is enabled', () => {
    interface Props {
      featureWithConfig: FeatureWithConfig
      text: string
    }
    const NeedConfigComponent: React.FC<Props> = props => {
      const { text, featureWithConfig } = props
      return (
        <div>
          {text} {configText(featureWithConfig.items)}
        </div>
      )
    }
    const Wrapped = withFeature<Features, Props>(NeedConfigComponent, 'featureWithConfig')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped text={componentText} />
      </FeatureProvider>
    )

    expect(container.textContent).toContain(componentText)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(container.textContent).toContain(configText(features.featureWithConfig!.items))
  })

  it('not render component when feature flag is disabled', () => {
    const Wrapped = withFeature<Features>(NoConfigComponent, 'disabledFeature')

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>
    )

    expect(container.textContent).toBeFalsy()
  })

  it('not render component with config when feature flag is disabled', () => {
    interface Props {
      disabledFeatureWithConfig: FeatureWithConfig
      text: string
    }
    const NeedConfigComponent: React.FC<Props> = props => {
      const { text, disabledFeatureWithConfig } = props
      return (
        <div>
          {text} {configText(disabledFeatureWithConfig.items)}
        </div>
      )
    }

    const Wrapped = withFeature<Features, Props>(NeedConfigComponent, 'disabledFeatureWithConfig')

    expect(() => {
      const { container } = render(
        <FeatureProvider features={features}>
          <Wrapped text={componentText} />
        </FeatureProvider>
      )

      expect(container.textContent).toBeFalsy()
    }).not.toThrow()
  })
})
