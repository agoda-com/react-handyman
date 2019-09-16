import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import FeatureProvider from '../src/FeaturesProvider';
import withoutFeature from '../src/withoutFeature';
import { Features, features } from './mock';

const componentText = 'I am component.';

const NoConfigComponent: React.FC = () => <div>{componentText}</div>;

describe('withoutFeature()', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('render component when feature flag is disabled', () => {
    const Wrapped = withoutFeature<Features>(NoConfigComponent, 'disabledFeature');

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>,
    );

    expect(container.textContent).toEqual(componentText);
  });

  it('not render component when feature flag is enabled', () => {
    const Wrapped = withoutFeature<Features>(NoConfigComponent, 'simpleFeature');

    const { container } = render(
      <FeatureProvider features={features}>
        <Wrapped />
      </FeatureProvider>,
    );

    expect(container.textContent).toBeFalsy();
  });
});
