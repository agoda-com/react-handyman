[![npm](https://img.shields.io/npm/v/format-to-jsx.svg)](https://www.npmjs.com/package/format-to-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/format-to-jsx.svg)](https://bundlephobia.com/result?p=format-to-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![dependabot badge](https://badgen.net/dependabot/matmalkowski/react-handyman/?icon=dependabot.svg)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# format-to-jsx

> 👉 Take note that this package is in still early stage of development, and there might be breaking changes introduced while we are finalizing on the API

String formatter with support of injecting JSX elements as parameters.

```bash
yarn add format-to-jsx

# or with npm

npm install format-to-jsx --save
```

## Example

```ts
import { format } from 'format-to-jsx'

format('This is a string template with a {0} based placeholder', 'number')

// This is a string template with a number based placeholder
```

## Supported template strings

`format-to-jsx` supports two ways of doing template strings:

### Index based template placeholders

Those are template strings where placeholders are based on `{X}` format where `X` is a positive integer based index. Each placeholder will be replaced by a corresponding parameter value provided, respecting order of parameters:

```ts
format('Example {1} with different placeholders order {0}', 1, 2)

// Example 2 with different placeholders order 1
```

### String based template placeholders

Those are template strings where placeholders are based on `{some_string}` format where `some_string` is a no-white space string. Each placeholder will be replaced by corresponding parameter passed via an object - object keys are used as lookup:

```ts
const params = { one: 1, two: 2 }

format('Example {two} with different placeholders order {one}', params)

// Example 2 with different placeholders order 1
```

## JSX arguments

Values passed as arguments, either with index or string based placeholders can be of type `string`, `number` or `React.ReactNode`. That enables you to create complex HTML while not injecting and manipulating the DOM outside of React scope. Result of a formatting with JSX will be a fragment instead of string:

```tsx
format('Example {1} with different placeholders order {0}', 1, <strong>2</strong>)

// <>Example <strong>2</strong> with different placeholders order 1<>
```

Template string with placeholders provided with `{}` braces. Index based placeholders starting with 0 OR string based placeholders are supported.

## API

#### Params

##### `template`

| Type     | Required |
| -------- | -------- |
| `string` | `true`   |

Template string with placeholders provided with `{}` braces. Index based placeholders starting with 0 OR string based placeholders are supported.

##### `...args[]`

| Type                                                                                                  | Required |
| ----------------------------------------------------------------------------------------------------- | -------- |
| `(string \| number \| React.ReactNode)[]` OR `{ [key: string]: string \| number \| React.ReactNode }` | `true`   |

When working with index based params / placeholders, each parameter will replace corresponding index placeholder. Values can be passed as primitives or `React.ReactNode`.
When working with string based params / placeholders, object with matching keys should be used.

##### `return`

- `string` - if only primitive params were used, returned value is a string.
- `React.Fragment` - if any of parameters provided was a `React.ReactNode`, returned value will be a React Fragment.

---

## Error and warnings:

When running in dev mode (`process.env.NODE_ENV !== 'production'`) the `format-to-jsx` will throw some `console.warn` to help you spotting incorrect formatting issues like passing different number of arguments than placeholders in the template or when matching placeholder was not paired with a parameter.

If template passed is `undefined` or `null` will throw and exception.
