import {
  formatNumber, setCurrentCulture, getNumberFormatter, getCustomNumberFormatter
} from '../src/numberFormatter';
import {
  NumberFormatOptions, LocaleMatcher, Style, UnitDisplay, Notation
} from '../src/numberFormatter/types';

describe('formatNumber()', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  it('returns "NaN" for non number parameters', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatNumber(undefined as any)).toBe('NaN');
  });

  it('uses default en-us format if called with no other context', () => {
    expect(formatNumber(1234567.89012)).toBe('1,234,567.89');
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');
  });

  it('forces amount of decimals if arg is provided', () => {
    expect(formatNumber(1234567.89012, 3)).toBe('1,234,567.890');
    expect(formatNumber(1234567.8912, 1)).toBe('1,234,567.9');
  });

  it('uses new altered culture if current culture was set', () => {
    setCurrentCulture('da-DK');
    expect(formatNumber(1234567.89012)).toBe('1.234.567,89');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
  });

  it('uses new altered culture if current culture was set even if it\'s lower case', () => {
    setCurrentCulture('da-dk');
    expect(formatNumber(1234567.89012)).toBe('1.234.567,89');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
  });

  // TODO: Consider reverting to default culture code if this happens
  it('throws an error if an obviously illegal culture code', () => {
    setCurrentCulture('ceci-nest-pas-une-culture-code');
    expect(() => formatNumber(1234567.89012)).toThrow('Invalid language tag: ceci-nest-pas-une-culture-code');
  });

  it('falls back to using "en-US" if current culture was set to an "fake" culture code', () => {
    setCurrentCulture('xy-zq');
    expect(formatNumber(1234567.89012)).toBe('1,234,567.89');
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');
  });
});

describe('getNumberFormatter()', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  it('returns a formatter which uses default en-us format if called with no parameters. Equivalent of formatNumber(<number>)', () => {
    const formatter = getNumberFormatter();
    expect(formatter.format(1234567.89012)).toBe('1,234,567.89');
    expect(formatter.format(1234567.8912)).toBe('1,234,567.891');
  });

  it('returns a formatter which forces amount of decimals if `decimals` arg is provided', () => {
    const formatter = getNumberFormatter(3);
    expect(formatter.format(1234567.89012)).toBe('1,234,567.890');
  });

  it('returns a formatter which uses the culture passed as `culture` arg', () => {
    const formatter = getNumberFormatter(undefined, 'da-DK');
    expect(formatter.format(1234567.89012)).toBe('1.234.567,89');
  });
});

describe('getCustomNumberFormatter()', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  it('returns a formatter which uses default en-us format if called with no parameters. Equivalent of formatNumber(<number>)', () => {
    const options: NumberFormatOptions = {
      minimumFractionDigits: 1,
      maximumFractionDigits: 3,
      localeMatcher: LocaleMatcher.bestFit,
      style: Style.decimal,
      unitDisplay: UnitDisplay.long,
      notation: Notation.standard
    };
    const formatter = getCustomNumberFormatter(options);
    expect(formatter.format(1234567)).toBe('1,234,567.0');
    expect(formatter.format(1234567.8912)).toBe('1,234,567.891');
  });
});
