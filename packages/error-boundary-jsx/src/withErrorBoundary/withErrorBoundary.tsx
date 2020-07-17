/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';

const withErrorBoundary = <TOrigProps extends Record<string, unknown>>(
  Component: React.ComponentType<TOrigProps>,
  onError: (componentName: string, error: Error, componentStack: string) => void,
  FallbackComponent?: React.ComponentType<any>
) => {
  const name = Component.displayName ? Component.displayName : 'Unnamed Component';

  const ErrorBoundaryWrapper = (props: TOrigProps) => (
    <ErrorBoundary onError={onError} name={name} FallbackComponent={FallbackComponent}>
      <Component {...props} />
    </ErrorBoundary>
  );

  ErrorBoundaryWrapper.displayName = `WithErrorBoundary(${name})`;

  return ErrorBoundaryWrapper;
};

export default withErrorBoundary;
