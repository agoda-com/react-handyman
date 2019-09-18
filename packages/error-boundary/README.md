[![npm](https://img.shields.io/npm/v/error-boundary.svg)](https://www.npmjs.com/package/error-boundary)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/error-boundary.svg)](https://bundlephobia.com/result?p=error-boundary)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![Greenkeeper badge](https://badges.greenkeeper.io/matmalkowski/react-handyman.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# error-boundary

Handle errors on any component

```bash
yarn add error-boundary

# or with npm

npm install error-boundary --save
```

## Example

```ts
import error-boundary from 'error-boundary'

const componentErrorHandler = {
    handleComponentError(error: Error, name: string, stack: string): void {
        ...log error
    }
}

withErrorBoundary(Component, 'component name', componentErrorHandler)
```

##### API

| prop       | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `component` | `React.ComponentType`     | true     | -            | A React component that we want to bind error boundary to                                                        |
| `name`      | `string`     | true     | -            | Component name to identify in stack message                                                       |
| `callback`  | `(error: Error, name: string, stack: string) => void`     | true     | -            | Error callback handler                                                     |

