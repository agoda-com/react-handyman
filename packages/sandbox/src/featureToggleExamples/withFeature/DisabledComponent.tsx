import * as React from 'react';
import { withFeature } from 'feature-toggle-jsx';
import { Features } from '../types';

const MyOtherFeatureComponent: React.FC<{}> = () => (
  <>
    <p>
      <strong>My Hidden Component</strong>
      <br />
      <span>You should not see this</span>
    </p>
  </>
);

const WrappedComponent = withFeature<Features>(MyOtherFeatureComponent, 'myOtherFeature');

export { WrappedComponent };

export default MyOtherFeatureComponent;
