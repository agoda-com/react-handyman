import * as React from 'react'
import { render } from '@testing-library/react'

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

describe(`useFeature() hook`, () => {
  describe(`when feature is enabled`, () => {
    it('return {} for simple feature', () => {
      const Component: React.FC = () => {
        const [feature] = useFeatures<Features>('simpleFeature')

        expect(feature).toBe(features.simpleFeature)

        return null
      }

      expect(() => testWithComponent(Component)).not.toThrow()
    })
    it('return config object for feature with configuration', () => {
      const Component: React.FC = () => {
        const [feature] = useFeatures<Features, 'featureWithConfig'>('featureWithConfig')

        expect(feature).toBe(features.featureWithConfig)

        return null
      }

      expect(() => testWithComponent(Component)).not.toThrow()
    })
  })

  describe(`when feature is not enabled`, () => {
    it('should return undefined when feature is not enabled', () => {
      const Component: React.FC = () => {
        const [feature] = useFeatures<Features>('disabledFeature')

        expect(feature).not.toBeDefined()

        return null
      }

      expect(() => testWithComponent(Component)).not.toThrow()
    })

    it('should return undefined when feature with configuration is not enabled', () => {
      const Component: React.FC = () => {
        const [feature] = useFeatures<Features>('disabledFeatureWithConfig')

        expect(feature).not.toBeDefined()

        return null
      }

      expect(() => testWithComponent(Component)).not.toThrow()
    })
  })
})
