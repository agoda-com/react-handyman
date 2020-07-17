import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorBoundary from '../src/ErrorBoundary';
import { ErrorFallbackProps } from '../src/ErrorBoundary/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  class BuggyComponent extends React.PureComponent<Record<string, unknown>, Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
      super(props);
      throw Error('error');
    }

    render() {
      return <div>Dummy Component with constructor error</div>;
    }
  }

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render fallback component on error', () => {
    const CustomFallbackComponent = (props: ErrorFallbackProps) => {
      const { error, errorStack } = props;

      return (
        <div>
          <h3>{error.message}</h3>
          <span>{errorStack}</span>
        </div>
      );
    };
    const errorCallback = jest.fn();

    const { asFragment } = render(
      <ErrorBoundary onError={errorCallback} name="component name" FallbackComponent={CustomFallbackComponent}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call componentDidCatch and fire callback on error', () => {
    const errorCallback = jest.fn().mockImplementation();

    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    const { asFragment } = render(
      <ErrorBoundary onError={errorCallback} name="component name">
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(errorCallback.mock.calls[0][0]).toBe('component name');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle callback exception', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    const errorCallback = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    render(
      <ErrorBoundary onError={errorCallback} name="component name">
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(consoleError.mock.calls[2][0]).toBeTruthy();
  });
});
