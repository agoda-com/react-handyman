[![npm](https://img.shields.io/npm/v/ab-test-jsx.svg)](https://www.npmjs.com/package/ab-test-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ab-test-jsx.svg)](https://bundlephobia.com/result?p=ab-test-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master&service=github)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/matmalkowski/react-handyman.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# ab-test-jsx

React (JS) based client for consuming AB tests logic in your app.

```bash
yarn add ab-test-jsx

# or with npm

npm install ab-test-jsx --save
```

# Setup

> 👉 Since `ab-test-jsx` is just a consumer library for your AB tests, you need to provide it with results of your allocation to tests running on the client. Its advised to to the allocation on the server side and simply hydrate the application with allocation state on first render.

`ab-test-jsx` uses ContextAPI to provide allocation information to components via Components/Hook/HOC. You need to set up the ContextAPI provided before you can consume the AB tests allocation results in underlying components. To do so, you can use `ABTestsProvider` or higher order component - `withABTestsProvider`

## `<ABTestsProvider />` component

Your app should we wrapped at the root level, pass the ab tests allocation results object using the `abTests` prop:

```js
<ABTestsProvider abTests={abTests}>
  <AppRoot {...props} />
</ABTestsProvider>
```

## `withABTestsProvider` Higher Order Component

You can wrap export of your application root with the HOC and pass the ab tests allocation results object using param:

```js
const WrappedApp = withABTestsProvider(App, abTests)
```

You can also use a function that will return `abTests` - this way you can access some data from props when decorating the component:

```js
const abTestsSelector = props => props.tests
const WrappedApp = withABTestsProvider(App, abTestsSelector)
```

## `ABTests` context

Your abTests, or allocation results, should be an object (dictionary) that specifies the name of the test (key) and allocated variant of that test for the session: `A` or `B`:

```ts
type Variant = 'A' | 'B'

interface ABTests {
  [key: string]: Variant
}
```

# Usage

There are multiple ways of accessing AB tests allocation results in your components. You can compose your JSX tree with `ABTest` component, use `useABTests` hook to access some getter functions, or experiment with conditional rendering of 2 components as single one based on allocation result - `withABTest`. For custom logic, you can always decorate your components props with the abTests context by using `withABTests` HOC.

## `<ABTest />` component

`<ABTest />` component is simple conditional renderer - it takes 2 props: `name` and `variant` and based on that information, will render its children. It can be used to compose complex layouts based on AB test:

```jsx
<ABTest name="changeHeaderSize" variant="A">
  <h1>Welcome on our page!</h1>
</ABTest>
<ABTest name="changeHeaderSize" variant="B">
  <h2>Welcome on our page!</h2>
</ABTest>
```

In above example, if user gets _A_ variant of the test `changeHeaderSize`, they will get layout based on `h1` heading size. For _B_ variant, user gets `h2` as heading.

// TODO: add more info about no limits when composing and number of components.
// TODO API table

## `usABTests` hook

## `withABTest` Higher Order Component

## `withABTests` Higher Order Component

# Typescript support
