import * as React from 'react';
import { cleanup } from '@testing-library/react';

import I18n from '../src/I18n';
import withI18nProvider from '../src/withI18nProvider';
import renderWithStore from './renderWithStore';

const SimpleWrapper: React.FC = ({ children }) => <div>{children}</div>;

describe('withI18nProvider()', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('should return translations for correct selected store fragment', () => {
    const Wrapped = withI18nProvider(s => s.translations)(SimpleWrapper);

    const { container } = renderWithStore(
      <Wrapped>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </Wrapped>,
    );

    expect(container.textContent).toEqual('number based key');
  });

  it('should default to Default value if selector doesnt select store partial object', () => {
    const Wrapped = withI18nProvider(s => s.translations2)(SimpleWrapper);

    const { container } = renderWithStore(
      <Wrapped>
        <span>
          <I18n k={1}>Default value</I18n>
        </span>
      </Wrapped>,
    );

    expect(container.textContent).toEqual('Default value');
  });
});
