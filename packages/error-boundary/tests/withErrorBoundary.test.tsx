import 'jest';
import * as React from 'react';
import withErrorBoundary from '../src/withErrorBoundary';
import { render } from '@testing-library/react';

describe('<ErrorBoundary />', () => {
  interface DummyErrorComponentProps {
    name?: string;
  }
  const defaultProps: DummyErrorComponentProps = {
    name: 'Test name',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  class DummyErrorComponent extends React.PureComponent<DummyErrorComponentProps, {}> {
    constructor(props: DummyErrorComponentProps) {
      super(props);
      throw Error('error');
    }
    render() {
      return <div>Dummy Error Component</div>;
    }
  }

  const errorCallback = jest.fn();

  it('should call componentDidCatch on error', () => {

    const ComponentWithError = withErrorBoundary(DummyErrorComponent, 'component name', errorCallback);

    jest.spyOn(ComponentWithError.prototype, 'componentDidCatch');
    const { asFragment } = render(<ComponentWithError {...defaultProps} />);
    expect(ComponentWithError.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    expect(asFragment).toMatchSnapshot();
  });
});
