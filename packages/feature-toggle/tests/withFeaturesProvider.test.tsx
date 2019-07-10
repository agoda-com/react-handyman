import 'jest'
import * as React from 'react'
import { render, cleanup, getNodeText } from '@testing-library/react'

import withFeaturesProvider from '../src/withFeaturesProvider'
import withFeature from '../src/withFeature'
import { Features, features } from './mock'

const componentText = 'This is component'
const Component: React.FC = ({ children }) => <div>{children}</div>
const FeatureComponent = withFeature<Features>(Component, 'simpleFeature')

describe('withFeaturesProvider()', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })
  it('should initialize context', () => {
    const Wrapped = withFeaturesProvider(FeatureComponent, features)

    const { container } = render(<Wrapped>{componentText}</Wrapped>)

    const innerText = getNodeText(container.querySelector('div')!)

    expect(innerText).toEqual(componentText)
  })
})
