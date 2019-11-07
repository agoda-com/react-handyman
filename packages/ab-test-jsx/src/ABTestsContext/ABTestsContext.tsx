import * as React from 'react';
import { Variant } from './types';

const ABTestsContext = React.createContext({});

export type Settings = {
  defaultVariant: Variant | 'Z';
}
export const ABTestsSettings = React.createContext<Settings>({ defaultVariant: 'A' });

export default ABTestsContext;
