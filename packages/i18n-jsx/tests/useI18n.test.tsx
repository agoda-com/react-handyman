import * as React from 'react';
import { render } from '@testing-library/react';
import renderWithStore from './renderWithStore';

import useI18n from '../src/useI18n';
import I18nProvider from '../src/I18nProvider';

jest.spyOn(global.console, 'warn').mockImplementation(() => { });

const testWithComponent = (Component: React.ComponentType, expected: string) => {
  const { container } = renderWithStore(
    <I18nProvider selector={s => s.translations}>
      <div>
        <Component />
      </div>
    </I18nProvider>,
  );

  expect(container.textContent).toEqual(expected);
};

describe('useI18n hook should return i18n function that', () => {
  it('should return text based on a numeric k prop', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n(1, 'Default text')}</span>;
    };

    testWithComponent(Component, 'number based key');
  });

  it('should return text based on a string k prop', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('example.key', 'Default text')}</span>;
    };

    testWithComponent(Component, 'string based key');
  });

  it('should return fallback text in case k is missing', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('invalid.key.string', 'Default text')}</span>;
    };

    testWithComponent(Component, 'Default text');
  });

  it('should return fallback text in case store is missing', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('invalid.key.string', 'Default text')}</span>;
    };
    const { container } = render(
      <I18nProvider selector={s => s.translations}>
        <div>
          <Component />
        </div>
      </I18nProvider>,
    );

    expect(container.textContent).toEqual('Default text');
  });

  it('should return fallback text in case selector returns empty / null store fragment', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('invalid.key.string', 'Default text')}</span>;
    };

    const { container } = renderWithStore(
      <I18nProvider selector={s => s.translationsInvalid}>
        <div>
          <Component />
        </div>
      </I18nProvider>,
    );

    expect(container.textContent).toEqual('Default text');
  });

  it('should allow using template string with single param', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('example.template', 'Default text', 123)}</span>;
    };

    testWithComponent(Component, 'string with 123 placeholder');
  });

  it('should allow using template string with many params', () => {
    const Component: React.FC = () => {
      const i18n = useI18n();
      return <span>{i18n('example.template.many', 'Default text', 123, 'some text')}</span>;
    };

    testWithComponent(Component, 'string with 123 placeholder and ending with another some text');
  });
});
