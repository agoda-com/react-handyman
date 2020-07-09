[![npm](https://img.shields.io/npm/v/error-boundary.svg)](https://www.npmjs.com/package/error-boundary-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/error-boundary.svg)](https://bundlephobia.com/result?p=error-boundary-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)
[![dependabot badge](https://badgen.net/dependabot/agoda-com/react-handyman/?icon=dependabot.svg)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# error-boundary-jsx

Handle errors on wrapped component and provide a fall back.

```bash
yarn add error-boundary-jsx

# or with npm

npm install error-boundary-jsx --save
```

### `<ErrorBoundary />` Component (Recommended)

Handle errors for specific use case of component.

```ts
import ErrorBoundary from 'error-boundary-jsx'

<ErrorBoundary onError={componentErrorHandler} name="component name" FallbackComponent={CustomFallbackComponent}>
    ...component tree to handle errors
</ErrorBoundary>
```

### `withErrorBoundary()` HOC

HOC for error handling every use case of a component.

```ts
import withErrorBoundary from 'error-boundary-jsx'

const componentErrorHandler = {
    handleComponentError(error: Error, name: string, stack: string): void {
        ...log error
    }
}

withErrorBoundary(Component, componentErrorHandler)
```

##### API

| prop       | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `component` | `React.ComponentType`     | true     | -            | A component that we want to bind error boundary jsx to                                                        |
| `name`      | `string`     | true     | -            | Component name to identify in stack message                                                       |
| `onError`  | `(name: string, error: Error, stack: string) => void`     | true     | -            | Error callback handler                                                     |
| `FallbackComponent` | `React.ComponentType`     | false     | -            | A fallback component when error occurs                                                       |

