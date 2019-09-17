import * as React from 'react';
import { withFeaturesProvider } from 'feature-toggle-jsx';

import { WrappedComponent } from './withFeature/Component';
import { WrappedComponentWithConfig } from './withFeature/ComponentWithConfiguration';
import { WrappedComponent as DisabledComponent } from './withFeature/DisabledComponent';
import { WrappedComponent as InverseDisabledComponent } from './withoutFeature/DisabledComponent';
import { Features } from './types';

const features: Partial<Features> = {
  myFeature: {},
  // myOtherFeature: {}, disabled
  myFeatureWithConfig: { items: ['this', 'is', 'my', 'example', 'config', 'items'] }
};

const FeatureToggleExamples: React.FC = () => (
  <>
    <h2>withFeature</h2>
    <WrappedComponent text="TEXT" />
    <DisabledComponent />
    <WrappedComponentWithConfig text="TEXT" number={3} />

    <h2>withoutFeature</h2>
    <InverseDisabledComponent />
  </>
);

export default withFeaturesProvider(FeatureToggleExamples, features);
