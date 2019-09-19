/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

const DEFAULT_ERROR = 'Error was swallowed.';

export interface ErrorFallbackProps {
  error: Error;
  errorStack: string;
}

interface ErrorBoundaryState {
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
}

interface ErrorInfo {
  componentStack: string;
}

interface Props {
  onError: (error: Error, componentName: string, componentStack: string) => void,
  name: string,
  children?: any,
  render?: (props: ErrorFallbackProps) => React.ReactNode,
}

class ErrorBoundary extends React.PureComponent<Props, ErrorBoundaryState> {
  // eslint-disable-next-line  react/static-property-placement
  static displayName = `ErrorBoundary(${name})`;

  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, name, errorInfo ? errorInfo.componentStack : '');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    this.setState({ error: error || new Error(DEFAULT_ERROR), errorInfo });
  }

  render(): JSX.Element {
    const { error, errorInfo } = this.state;
    const { children, render } = this.props;

    // error flow
    if (error) {
      if (render) {
        return (
          <>
            {render({
              error: error,
              errorStack: errorInfo ? errorInfo.componentStack : 'Stack not found'
            })}
          </>
        )
      }

      return <h2>Something went wrong.</h2>;
    }

    // happy flow
    return children;
  }
}

export default ErrorBoundary;
