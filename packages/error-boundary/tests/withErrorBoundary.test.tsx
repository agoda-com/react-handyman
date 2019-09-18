import 'jest';
import * as React from 'react';
import withErrorBoundary from '../src/withErrorBoundary';
import { render } from '@testing-library/react';

interface DummyErrorComponentProps {
  name?: string;
}
const defaultProps: DummyErrorComponentProps = {
  name: 'Test name',
};

class DummyErrorComponent extends React.PureComponent<DummyErrorComponentProps, {}> {
  constructor(props: DummyErrorComponentProps) {
    super(props);
    throw Error('error');
  }
  render() {
    return <div>Dummy Component with constructor error</div>;
  }
}

describe('<ErrorBoundary />', () => {

  const errorCallback = jest.fn();

  it('should call componentDidCatch on error and fire callback', () => {

    const ComponentWithError = withErrorBoundary(DummyErrorComponent, 'component name', errorCallback);

    jest.spyOn(ComponentWithError.prototype, 'componentDidCatch');
    render(<ComponentWithError {...defaultProps} />);
    expect(ComponentWithError.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    expect(errorCallback).toHaveBeenCalledTimes(1);
  });
});
