export enum LocaleMatcher {
  lookup = 'lookup',
  bestFit = 'best fit'
}

export enum Style {
  decimal = 'decimal',
  currency = 'currency',
  percent = 'percent',
  unit = 'unit'
}

export enum UnitDisplay {
  long = 'long',
  short = 'short',
  narrow = 'narrow'
}

export enum Notation {
  standard = 'standard',
  scientific = 'scientific',
  engineering = 'engineering',
  compact = 'compact',
}

export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  localeMatcher?: LocaleMatcher;
  style?: Style;
  unitDisplay?: UnitDisplay;
  notation?: Notation;
}
