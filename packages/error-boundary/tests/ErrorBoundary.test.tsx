import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorBoundary, { ErrorFallbackProps } from '../src/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should render fallback component on error', () => {
    class BuggyComponent extends React.PureComponent<{}, {}> {
      static displayName = 'BuggyComponent';

      constructor(props: {}) {
        super(props);
        throw Error('error');
      }

      render() {
        return <div>Dummy Component with constructor error</div>;
      }
    }

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
    class BuggyComponent extends React.PureComponent<{}, {}> {
      constructor(props: {}) {
        super(props);
        throw Error('error');
      }

      render() {
        return <div>Dummy Component with constructor error</div>;
      }
    }

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
});
