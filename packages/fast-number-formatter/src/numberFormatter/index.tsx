import { NumberFormatOptions } from './types';

const latinNumberSystemArg = '-u-nu-latn';
const defaultCulture = 'en-us';
let currentCulture = defaultCulture;
let defaultOptions: NumberFormatOptions = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatters: any = {};

const getCultureFromKey = (culture: string): string => {
  if (culture.match(/\w+-u-nu-\w+/i)) return culture;
  return culture + latinNumberSystemArg;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNumberFormatter = (culture: string, options?: any) => {
  if (options) return new Intl.NumberFormat(getCultureFromKey(culture), options);
  return new Intl.NumberFormat(getCultureFromKey(culture));
};

const numberFormatOptionsToJson = (options: NumberFormatOptions): string => {
  if (!options.localeMatcher
    && !options.maximumFractionDigits
    && !options.minimumFractionDigits
    && !options.notation
    && !options.style
    && !options.unitDisplay) {
    return 'noOptions';
  }
  let json = '';
  if (options.localeMatcher) json = options.localeMatcher;
  if (options.maximumFractionDigits) json += options.maximumFractionDigits;
  if (options.minimumFractionDigits) json += options.minimumFractionDigits;
  if (options.style) json += options.style;
  if (options.unitDisplay) json += options.unitDisplay;
  if (options.notation) json += options.notation;
  return json;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrGetNumberFormatter = (culture: string, options: any): Intl.NumberFormat => {
  if (!formatters[culture]) {
    formatters[culture] = {};
  }
  const jsonKey = numberFormatOptionsToJson(options);
  if (!formatters[culture][jsonKey]) {
    if (jsonKey === 'noOptions') {
      formatters[culture][jsonKey] = createNumberFormatter(culture);
    } else {
      formatters[culture][jsonKey] = createNumberFormatter(culture, options);
    }
  }
  return formatters[culture][jsonKey];
};

// To avoid affecting performance as much as possible we only test the culture code if it looks unfamiliar.
const validateCulture = (culture: string) => {
  if ((culture.length !== 2 && culture.length < 5) || !culture.match(/^[a-z]{2}(-[a-z]{2})?(-u-nu-[a-z]+)?$/i)) {
    const options = { ...defaultOptions };
    createOrGetNumberFormatter(culture, options).format(0);
  }
};

export const setGlobalDefaultOptions = (options: NumberFormatOptions) => {
  if (options) defaultOptions = options;
};

// WARNING: You should only call this method once for each time the culture is changed.
// - If you need another format for some reason, use getNumberFormatter and provide a culture
export const setCurrentCulture = (culture: string) => {
  const lowerCulture = culture.toLowerCase();
  if (currentCulture !== lowerCulture) {
    validateCulture(lowerCulture);
    currentCulture = lowerCulture;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWildcardNumberFormatter = (options: any, culture?: string): Intl.NumberFormat => {
  let cultureKey = culture;
  if (!cultureKey) {
    cultureKey = currentCulture;
  }
  return createOrGetNumberFormatter(cultureKey, options);
};

export const getCustomNumberFormatter = (options: NumberFormatOptions, culture?: string): Intl.NumberFormat =>
  getWildcardNumberFormatter(options, culture);

export const getNumberFormatter = (decimals?: number, culture?: string): Intl.NumberFormat => {
  const options = { ...defaultOptions };
  if (decimals) {
    options.maximumFractionDigits = decimals;
    options.minimumFractionDigits = decimals;
  }
  return getCustomNumberFormatter(options, culture);
};

export const formatNumber = (number: number, decimals?: number): string => {
  const formatter = getNumberFormatter(decimals);
  return formatter.format(number);
};

// Consider adding a currency formatter section, if we need it at some point
