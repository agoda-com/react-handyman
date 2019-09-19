import * as React from 'react';
import { render } from '@testing-library/react';
import withErrorBoundary from '../src/withErrorBoundary';
import { ErrorInfo } from 'react'
import { ErrorFallbackProps } from '../src/ErrorBoundary/ErrorBoundary'

interface DummyErrorComponentProps {
  name?: string;
}
const defaultProps: DummyErrorComponentProps = {
  name: 'Test name'
};

class BuggyComponent extends React.PureComponent<DummyErrorComponentProps, {}> {
  constructor(props: DummyErrorComponentProps) {
    super(props);
    throw Error('error');
  }

  render() {
    return <div>Buggy Component with constructor error</div>;
  }
}
describe('<ErrorBoundary />', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render default fallback component on error', () => {
    const errorCallback = jest.fn();
    const ComponentWithError = withErrorBoundary(BuggyComponent, 'component name', errorCallback);
    const { asFragment } = render(<ComponentWithError name={defaultProps.name} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom fallback component on error', () => {
    const CustomFallbackComponent = (props: ErrorFallbackProps) => (
      <div>
        <h3>{props.error.message}</h3>
        <span>{props.errorStack}</span>
      </div>
    );
    const errorCallback = jest.fn();
    const ComponentWithError = withErrorBoundary(BuggyComponent, 'component name', errorCallback, CustomFallbackComponent);
    const { asFragment } = render(<ComponentWithError name={defaultProps.name} />);
    expect(asFragment()).toMatchSnapshot();
  });

});
