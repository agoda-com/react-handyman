[![npm](https://img.shields.io/npm/v/fast-number-formatter.svg)](https://www.npmjs.com/package/fast-number-formatter)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/fast-number-formatter.svg)](https://bundlephobia.com/result?p=fast-number-formatter)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)
[![Greenkeeper badge](https://badges.greenkeeper.io/agoda-com/react-handyman.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# fast-number-formatter

> 👉 Take note that this package is in still early stage of development, and there might be breaking changes introduced while we are finalizing on the API

A NumberFormatter which forces developpers to reuse the format instead of creating new copies for each number (Which should theoretically make it faster)

```bash
yarn add fast-number-formatter

# or with npm

npm install fast-number-formatter --save
```

## Examples

```ts
import { formatNumber } from 'fast-number-formatter'

const formattedString = formatNumber(12345.6789);
// 12,345.67

const threeDecimalString = formatNumber(12345.6789, 3);
// 12,345.678

setCurrentCulture('da-DK');
const oneDecimalDanishString = formatNumber(12345.6789, 1);
// 12.345,6

const formatter = getNumberFormatter(4, 'da-DK');
const fourDecimalDanishString = formatter.format(12345.6789)
// 12.345,6789

const options: NumberFormatOptions = {
    minimumFractionDigits: 1,
    maximumFractionDigits: 3,
    localeMatcher: LocaleMatcher.bestFit,
    style: Style.decimal,
    unitDisplay: UnitDisplay.long,
    notation: Notation.standard
};
const formatter = getCustomNumberFormatter(options, 'da-DK');
const firstCustomFormattedString = formatter.format(12345.6789)
// 12.345,678
const secondCustomFormattedString = formatter.format(12345)
// 12.345,0
```
