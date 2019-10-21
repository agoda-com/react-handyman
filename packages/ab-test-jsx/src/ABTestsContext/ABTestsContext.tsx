import * as React from 'react';

const ABTestsContext = React.createContext({});

export type Settings = {
  defaultVariant: string;
}
export const ABTestsSettings = React.createContext<Settings>({ defaultVariant: 'A' });

export default ABTestsContext;
