/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ErrorFallbackProps } from '../ErrorBoundary/ErrorBoundary'

const withErrorBoundary = <TOrigProps extends {}>(
  Component: React.ComponentType<TOrigProps>,
  name: string,
  onError: (error: Error, componentName: string, componentStack: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FallbackComponent?: (props: ErrorFallbackProps) => React.ReactNode,
) => {

  const ErrorBoundaryWrapper = (props: TOrigProps) => (
      <ErrorBoundary onError={onError} name={name} render={FallbackComponent}>
        <Component {...props} />
      </ErrorBoundary>
  );

  ErrorBoundaryWrapper.displayName = `WithErrorBoundary(${name})`;

  return ErrorBoundaryWrapper;
};

export default withErrorBoundary;
