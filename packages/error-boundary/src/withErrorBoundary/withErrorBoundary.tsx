import * as React from 'react';

interface ErrorInfo {
  componentStack: string;
}

const withErrorBoundary = <TProps extends {}>(
  Component: React.ComponentType<TProps>,
  name: string,
  onError: (error: Error, componentName: string, componentStack: string) => void,
) => {

  return class ErrorBoundary extends React.PureComponent<TProps, {}> {

    static displayName = `withErrorBoundary(${Component.displayName})`;

    constructor(props: TProps) {
      super(props);
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
      if (typeof onError === 'function') {
        try {
          onError.call(this, error, name, info ? info.componentStack : '');
        } catch (e) { }
      }
    }

    render(): JSX.Element {
      return <Component {...this.props} />;
    }
  };
}

export default withErrorBoundary;
