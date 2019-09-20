/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  onError: (componentName: string, error: Error, componentStack: string) => void,
  name: string,
  children?: any,
  FallbackComponent?: React.ComponentType<any>,
}

class ErrorBoundary extends React.PureComponent<Props, ErrorBoundaryState> {
  // eslint-disable-next-line  react/static-property-placement
  static displayName = 'ErrorBoundary';

  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, name } = this.props;

    if (typeof onError === 'function') {
      try {
        onError(name, error, errorInfo ? errorInfo.componentStack : 'No stack');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    this.setState({ error: error || new Error(DEFAULT_ERROR), errorInfo });
  }

  render(): JSX.Element {
    const { error, errorInfo } = this.state;
    const { children, FallbackComponent } = this.props;

    // error flow
    if (error) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} errorStack={errorInfo ? errorInfo.componentStack : 'Stack not found'} />;
      }
      return <h2>Something went wrong.</h2>;
    }

    // happy flow
    return children;
  }
}

export default ErrorBoundary;
