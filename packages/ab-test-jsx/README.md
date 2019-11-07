[![npm](https://img.shields.io/npm/v/ab-test-jsx.svg)](https://www.npmjs.com/package/ab-test-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ab-test-jsx.svg)](https://bundlephobia.com/result?p=ab-test-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![dependabot badge](https://badgen.net/dependabot/matmalkowski/react-handyman/?icon=dependabot.svg)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# ab-test-jsx

React (JS) based client for consuming AB test logic in your app.

```bash
yarn add ab-test-jsx

# or with npm

npm install ab-test-jsx --save
```

# Setup

> 👉 `ab-test-jsx` is a consumer library for AB tests, provide results of allocation to running tests on the client. It's advised to allocate on the server-side and simply hydrate the application with allocation state on first render.

`ab-test-jsx` uses the ContextAPI to provide allocation information to components via Components/Hook/HOC. Set-up the ContextAPI provider before consuming the AB test allocation results in child components. Either use `ABTestsProvider` or the higher order component - `withABTestsProvider`

## `<ABTestsProvider />` component

The app should be wrapped at the root level. Pass the ab tests allocation results object using the `abTests` prop:

```js
<ABTestsProvider abTests={abTests}>
  <AppRoot {...props} />
</ABTestsProvider>
```

Additional settings can be passed:

```
defaultVariant: 'A' // what variant should be returned if experiment cannot be found in the context. Defaults to A
```

## `withABTestsProvider` Higher Order Component

Wrap export of application root with the HOC and pass the ab tests allocation results object using param:

```js
const WrappedApp = withABTestsProvider(App, abTests)
```

It's also possible to use a function that will return `abTests` - to access data from props when decorating the component:

```js
const abTestsSelector = props => props.tests
const WrappedApp = withABTestsProvider(App, abTestsSelector)
```

## `ABTests` context

AB tests or allocation results should be an object (dictionary) that specifies the name of the test (key) and allocated variant of that test for the session: `A` or `B`:

```ts
type Variant = 'A' | 'B'

interface ABTests {
  [key: string]: Variant
}
```

# Usage

There are multiple ways of accessing AB tests allocation results in components. Either compose the JSX tree with `ABTest` component, use `useABTests` hook to access some getter functions, or experiment with conditional rendering of 2 components as single one based on allocation result - `withABTest`. For custom logic, always decorate components props with the abTests context by using `withABTests` HOC.

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

> 💡 Note that when composing AB tests, don't keep A & B variants of `<ABTest /> next to each other, as well you are not limited to single usage. It's possible to wrap as many children as needed as long as they are in same tree as Context Provider

##### API

| prop       | type               | required | defaultValue | Description                                                                     |
| ---------- | ------------------ | -------- | ------------ | ------------------------------------------------------------------------------- |
| `name`     | `string \| number` | true     | -            | key value used to look up AB test allocation                                    |
| `variant`  | `A \| B`           | true     | -            | specifies under what allocation the children of the component will get rendered |
| `children` | `React.Node[]`     | true     | -            | conditionally rendered components                                               |

---

## `useABTests()` hook

Use the `useABTests()` React hook to access the AB tests related values in functional components. Hook will return an object with 3 functions that can be called to evaluate allocation:

```js
const Header: React.FC = () => {
  const { getVariant, isB, isA } = useABTests()

  const isNewHeader = isB('changeHeaderSize') // We can test and write conditional logic based on allocation

  return isNewHeader ? <h1>Super dope header</h1> : <span>Super dope header</span>
}
```

Use a function that is needed for each use case - example above lists them all. Since this is simple object destructuring use `isB()` from the hook:

```js
const { isB } = useABTests()
```

##### API

`getVariant(name: string | number) => Variant` - use this function to get current variant of AB test. `name` is the name of the test, returns `Variant` type (`A` | `B` | `Z`)

`isB(name: string | number) => boolean` - use this function to check if specific AB tests is allocated to _B_ variant. `name` is the name of the test, returns `boolean`

`isA(name: string | number) => boolean` - use this function to check if specific AB tests is allocated to _A_ variant. `name` is the name of the test, returns `boolean`

---

## `withABTest` Higher Order Component

USE if there are 2 different components that are suposed to be 2 different variants of AB tests. Lets say you implemented new complex Header layout and you want to render it only for B variant users:

```js
const HeaderUnderABTest = withABTest(Header, NewHeader, 'useNewHeader')
```

In above example, Header is A variant component, NewHeader is our B variant component, and 3rd parameter is the test name. Props of both A and B variants are both merged together so it's easier to use the tested component in code:

```js
<HeaderUnderABTest somePropFromHeader={1} anotherPropButFromNewHeader={2} />
```

##### API

| param             | type                | description                                  |
| ----------------- | ------------------- | -------------------------------------------- |
| AVariantComponent | React.ComponentType | A variant of component                       |
| BVariantComponent | React.ComponentType | B variant of component                       |
| abTestName        | `string \| number`  | key value used to look up AB test allocation |

Returns a component that will conditionally render either A or B variant parameter component based on test name and allocation. Props of both A and B variants are merged together and exposed.

## `withABTests` Higher Order Component

If you need to pass all experiments from context as props into a component, use `withABTests` Higher Order Component. It will decorate the component with `abTests` prop containing all allocation data:

```js
const SomeComponent = ({ text, abTests }) => (
  <>
    <span>{text}</span>
    {abTests.test1 === 'A' && <span>test1=A</span>}
    {abTests.test1 === 'B' && <span>test1=B</span>}
  </>
)

const SomeComponentWithABTests = withABTests(SomeComponent)
```

# Typescript support

The library supports fully typed experience for allocation data as well as all components. To ensure type safety with AB tests names provide a type defining schema as a generic argument:

```ts
import * as ABTestJsx from 'ab-test-jsx'

type TestsSchema = {
  test1: ABTestJsx.Variant
  test2: ABTestJsx.Variant
}

const {
  ABTest,
  ABTestsProvider,
  useABTests,
  withABTest,
  withABTests,
  withABTestsProvider,
} = ABTestJsx as ABTestJsx.ABTestsModule<TestsSchema>
```

Use exports instead of going with library directly, and all AB tests names will become type checked against the declared schema!

Following example will result in type checking error, since `test3` is not a property that exists on `TestsSchema` type:

```tsx
<ABTest name="test3" variant="B">
  <span>test2=B</span>
</ABTest>
```
