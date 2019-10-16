import { NumberFormatOptions } from './types';

const defaultCulture = 'en-us';
let currentCulture = defaultCulture;
const defaultOptions: NumberFormatOptions = {}; // Set default options here if needed down the line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatters: any = {};

// WARNING: You should only call this method once for each time the culture is changed.
// - If you need another format for some reason, use getNumberFormatter and provide a culture
export const setCurrentCulture = (culture: string) => {
  const lowerCulture = culture.toLowerCase();
  if (currentCulture !== lowerCulture) {
    currentCulture = lowerCulture;
  }
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
export const getWildcardNumberFormatter = (options: any, culture?: string): Intl.NumberFormat => {
  let cultureKey = culture;
  if (!cultureKey) {
    cultureKey = currentCulture;
  }
  if (!formatters[cultureKey]) {
    formatters[cultureKey] = {};
  }
  const jsonKey = numberFormatOptionsToJson(options);
  if (!formatters[cultureKey][jsonKey]) {
    if (jsonKey === 'noOptions') {
      formatters[cultureKey][jsonKey] = new Intl.NumberFormat(cultureKey);
    } else {
      formatters[cultureKey][jsonKey] = new Intl.NumberFormat(cultureKey, options);
    }
  }
  return formatters[cultureKey][jsonKey];
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
