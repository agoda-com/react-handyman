/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const translations = (state = {
  1: 'number based key',
  'example.key': 'string based key',
  'example.template': 'string with {0} placeholder',
  'example.template.many': 'string with {0} placeholder and ending with another {1}',
  'example.template.obj': 'string with {one} or {two} object based values'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(combineReducers({ translations }));

const renderWithStore = (ui: React.ReactElement) => render(
  <Provider store={store}>
    {ui}
  </Provider>
);

export default renderWithStore;
