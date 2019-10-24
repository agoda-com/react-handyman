import * as React from 'react';
import ABTestsContext, { ABTests } from '../ABTestsContext';
import { ABTestsSettings } from '../ABTestsContext/ABTestsContext';

export type useABTestsHook<T extends ABTests> = <TName extends Extract<keyof T, string | number>>() => {
  getVariant: (name: TName) => 'A' | 'B' | 'Z'
  isB: (name: TName) => boolean
  isA: (name: TName) => boolean
}

const useABTests = <T extends ABTests, TName extends Extract<keyof T, string | number>>() => {
  const abTests = React.useContext(ABTestsContext) as T;
  const settings = React.useContext(ABTestsSettings);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getVariant = (name: TName): 'A' | 'B' | 'Z' => abTests[name]! || settings.defaultVariant;
  const isB = (name: TName) => getVariant(name) === 'B';
  const isA = (name: TName) => getVariant(name) === 'A';

  return {
    getVariant,
    isB,
    isA
  };
};

export default useABTests;
