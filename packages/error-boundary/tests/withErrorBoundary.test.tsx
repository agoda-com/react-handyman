import * as React from 'react';
import { render } from '@testing-library/react';
import withErrorBoundary from '../src/withErrorBoundary';
import { ErrorFallbackProps } from '../src/ErrorBoundary';

interface DummyErrorComponentProps {
  name?: string;
}

class BuggyComponent extends React.PureComponent<DummyErrorComponentProps, {}> {
  static displayName = 'BuggyComponent';

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
    const ComponentWithError = withErrorBoundary(BuggyComponent, errorCallback);
    const { asFragment } = render(<ComponentWithError />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom fallback component on error', () => {
    const CustomFallbackComponent = (props: ErrorFallbackProps) => {
      const { error, errorStack } = props;

      return (
        <div>
          <h3>{error.message}</h3>
          <span>{errorStack}</span>
        </div>
      );
    };

    CustomFallbackComponent.displayName = 'CustomFallbackComponent';

    const errorCallback = jest.fn();
    const ComponentWithError = withErrorBoundary(BuggyComponent, errorCallback, CustomFallbackComponent);
    const { asFragment } = render(<ComponentWithError />);
    expect(asFragment()).toMatchSnapshot();
  });
});
