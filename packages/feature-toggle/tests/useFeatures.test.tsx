import 'jest'
import * as React from 'react'
import { render, getNodeText } from '@testing-library/react'

import useFeatures from '../src/useFeatures'
import FeatureProvider from '../src/FeaturesProvider'
import { Features, features } from './mock'

const testWithComponent = (Component: React.ComponentType) =>
  render(
    <FeatureProvider features={features}>
      <div>
        <Component />
      </div>
    </FeatureProvider>
  )

describe('useFeature hook', () => {
  it('should return empty object for feature with no configuration', () => {
    const Component: React.FC = _ => {
      const [feature] = useFeatures<Features, 'simpleFeature'>('simpleFeature')

      expect(feature).toBe(features.simpleFeature)

      return null
    }

    expect(() => testWithComponent(Component)).not.toThrow()
  })

  it('should return configuration object for feature with configuration', () => {
    const Component: React.FC = _ => {
      const [feature] = useFeatures<Features, 'featureWithConfig'>('featureWithConfig')

      expect(feature).toBe(features.featureWithConfig)

      return null
    }

    expect(() => testWithComponent(Component)).not.toThrow()
  })

  it('should return undefined when feature is not enabled', () => {
    const Component: React.FC = _ => {
      const [feature] = useFeatures<Features, 'disabledFeature'>('disabledFeature')

      expect(feature).not.toBeDefined()

      return null
    }

    expect(() => testWithComponent(Component)).not.toThrow()
  })

  it('should return undefined when feature with configuration is not enabled', () => {
    const Component: React.FC = _ => {
      const [feature] = useFeatures<Features, 'disabledFeatureWithConfig'>('disabledFeatureWithConfig')

      expect(feature).not.toBeDefined()

      return null
    }

    expect(() => testWithComponent(Component)).not.toThrow()
  })
})
