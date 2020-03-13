import * as React from 'react';
import { cleanup } from '@testing-library/react';
import withI18n from '../src/withI18n';
import I18nProvider from '../src/I18nProvider';
import { I18nSelector } from '../src/useI18n';
import renderWithStore from './renderWithStore';

jest.spyOn(global.console, 'warn').mockImplementation(() => { });

interface TranslationProps {
  injectedProp: string;
}
const TestComponent: React.FC<TranslationProps> = ({ injectedProp }) => <span>{injectedProp}</span>;

describe('withI18n()', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('should render text based on a numeric k prop', () => {
    const Wrapped = withI18n((i18n: I18nSelector) => ({ injectedProp: i18n(1, 'Default value') }))(TestComponent);

    const { container } = renderWithStore(
      <I18nProvider selector={s => s.translations}>
        <Wrapped />
      </I18nProvider>
    );

    expect(container.textContent).toEqual('number based key');
  });

  it('should render text based on a string k prop', () => {
    const Wrapped = withI18n((i18n: I18nSelector) => ({
      injectedProp: i18n('example.key', 'Default value')
    }))(TestComponent);

    const { container } = renderWithStore(
      <I18nProvider selector={s => s.translations}>
        <Wrapped />
      </I18nProvider>
    );

    expect(container.textContent).toEqual('string based key');
  });

  it('should render default fallback value when k key is not present in context', () => {
    const Wrapped = withI18n((i18n: I18nSelector) => ({
      injectedProp: i18n('invalid.key.string', 'Default value')
    }))(TestComponent);

    const { container } = renderWithStore(
      <I18nProvider selector={s => s.translations}>
        <Wrapped />
      </I18nProvider>
    );

    expect(container.textContent).toEqual('Default value');
  });
  describe('template text', () => {
    it('with with a numeric value', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n('example.template', 'Default value', 123)
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with 123 placeholder');
    });

    it('should render with with a string value', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n('example.template', 'Default value', 'some replaced string')
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with some replaced string placeholder');
    });

    it('should render with multiple values', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n('example.template.many', 'Default value', 'some replaced string', 123)
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123');
    });

    it('should render with string based template and object args', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n('example.template.obj', 'string with {one} or {two} object based values', {
          one: 1,
          two: 2
        })
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with 1 or 2 object based values');
    });

    it('should render default fallback value when k key is not present in context', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n('invalid.key.string', 'string with {0} placeholder', 'some replaced string')
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with some replaced string placeholder');
    });

    it('should render default fallback value when k key is not present in context - multiple placeholders', () => {
      const Wrapped = withI18n((i18n: I18nSelector) => ({
        injectedProp: i18n(
          'invalid.key.string',
          'string with {0} placeholder and ending with another {1}',
          'some replaced string',
          123
        )
      }))(TestComponent);

      const { container } = renderWithStore(
        <I18nProvider selector={s => s.translations}>
          <Wrapped />
        </I18nProvider>
      );

      expect(container.textContent).toEqual('string with some replaced string placeholder and ending with another 123');
    });
  });
});
