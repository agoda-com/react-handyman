import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import ErrorBoundary from '../src/ErrorBoundary'
import { ErrorFallbackProps } from '../src/ErrorBoundary/ErrorBoundary'

class BuggyComponent extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
    throw Error('error');
  }

  render() {
    return <div>Dummy Component with constructor error</div>;
  }
}
describe('<ErrorBoundary />', () => {

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should render fallback component on error', () => {
    const CustomFallbackComponent = (props: ErrorFallbackProps) => (
      <div>
        <h3>{props.error.message}</h3>
        <span>{props.errorStack}</span>
      </div>
    );
    const errorCallback = jest.fn();

    const { asFragment } = render(
      <ErrorBoundary onError={errorCallback} name={'component name'} render={CustomFallbackComponent}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call componentDidCatch and fire callback on error', () => {
    const errorCallback = jest.fn();

    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    const consoleSpy = jest.spyOn(console, 'error')

    const { asFragment } = render(
      <ErrorBoundary onError={errorCallback} name={'component name'}>
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });

});
