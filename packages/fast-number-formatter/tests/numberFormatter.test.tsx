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
    setCurrentCulture('en-US');
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

  it('uses new altered culture if current culture was set even if it\'s lower case or shorthand', () => {
    setCurrentCulture('da-dk');
    expect(formatNumber(1234567.89012)).toBe('1.234.567,89');
    setCurrentCulture('da-dk-u-nu-latn');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
    setCurrentCulture('da');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
    setCurrentCulture('da-u-nu-latn');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
  });

  it('throws an error if an obviously illegal culture code is set globally using setCurrentCulture', () => {
    const invalidLanguageTag = 'Invalid language tag: ';
    const latinArg = '-u-nu-latn';

    const obviouslyWrong = 'ceci-nest-pas-une-culture-code';
    expect(() => setCurrentCulture(obviouslyWrong)).toThrow(invalidLanguageTag + obviouslyWrong + latinArg);

    const wrong = '/da-dk/';
    expect(() => setCurrentCulture(wrong)).toThrow(invalidLanguageTag + wrong + latinArg);

    const alsoWrong = 'qq-q8';
    expect(() => setCurrentCulture(alsoWrong)).toThrow(invalidLanguageTag + alsoWrong + latinArg);

    const wrongButSwallowed = 'qq-qq';
    expect(() => setCurrentCulture(wrongButSwallowed)).not.toThrow();
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');

    const wrongButCloseEnough = 'da-dc'; // Will match on 'da' for danish.
    expect(() => setCurrentCulture(wrongButCloseEnough)).not.toThrow();
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');

    const notwrong = 'zh-hans-cn';
    expect(() => setCurrentCulture(notwrong)).not.toThrow();
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');

    const notwrongeither = 'zh-hans-cn-u-nu-hanidec';
    expect(() => setCurrentCulture(notwrongeither)).not.toThrow();
    expect(formatNumber(1234567.8912)).toBe('一,二三四,五六七.八九一');
  });

  it('falls back to using "en-US" if current culture was set to an "fake" culture code', () => {
    setCurrentCulture('xy-zq');
    expect(formatNumber(1234567.89012)).toBe('1,234,567.89');
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');
  });

  it('enforces latin number system unless number system is explicitly noted in cuntry code arguments', () => {
    setCurrentCulture('zh-Hans-CN');
    expect(formatNumber(1234567.89012)).toBe('1,234,567.89');
    setCurrentCulture('sr-Qaaa-RS');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
    setCurrentCulture('sr-Cyrl');
    expect(formatNumber(1234567.8912)).toBe('1.234.567,891');
    setCurrentCulture('th-TH-u-nu-thai');
    expect(formatNumber(1234567.8912)).toBe('๑,๒๓๔,๕๖๗.๘๙๑');
    setCurrentCulture('ar-EG');
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');
    setCurrentCulture('ar-EG-u-nu-latn');
    expect(formatNumber(1234567.8912)).toBe('1,234,567.891');
    setCurrentCulture('ar-EG-u-nu-arab');
    expect(formatNumber(1234567.8912)).toBe('١٬٢٣٤٬٥٦٧٫٨٩١');
    setCurrentCulture('da-DK-u-nu-arab');
    expect(formatNumber(1234567.8912)).toBe('١٬٢٣٤٬٥٦٧٫٨٩١');
    setCurrentCulture('da-u-nu-arab');
    expect(formatNumber(1234567.8912)).toBe('١٬٢٣٤٬٥٦٧٫٨٩١');
  });
});

describe('getNumberFormatter()', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
    setCurrentCulture('en-US');
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
    setCurrentCulture('en-US');
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

  it('returns a formatter which enforces lating numbers unless country code arguments explicitly indicate the number system.', () => {
    const options: NumberFormatOptions = {
      minimumFractionDigits: 1,
      maximumFractionDigits: 3,
      localeMatcher: LocaleMatcher.bestFit,
      style: Style.decimal,
      unitDisplay: UnitDisplay.long,
      notation: Notation.standard
    };
    const formatterOne = getCustomNumberFormatter(options, 'ar-EG');
    expect(formatterOne.format(1234567.8912)).toBe('1,234,567.891');
    const formatterTwo = getCustomNumberFormatter(options, 'ar-EG-u-nu-arab');
    expect(formatterTwo.format(1234567.8912)).toBe('١٬٢٣٤٬٥٦٧٫٨٩١');
  });
});
