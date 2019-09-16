[![npm](https://img.shields.io/npm/v/i18n-jsx.svg)](https://www.npmjs.com/package/i18n-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/i18n-jsx.svg)](https://bundlephobia.com/result?p=i18n-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![Greenkeeper badge](https://badges.greenkeeper.io/matmalkowski/react-handyman.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# i18n-jsx

> 👉 Take note that this package is in still early stage of development, and there might be breaking changes introduced while we are finalizing on the API

Simple React (JS) text internationalization with formatting support.

```bash
yarn add i18n-jsx

# or with npm

npm install i18n-jsx --save
```

## Example

```jsx
...
<span>
  <I18n k="example.key.1">Some sample text</I18n>
</span>
...
```

Unsurprisingly renders:

```html
<span>Some sample text</span>
```

The text passed as a `child` to `I18n` component is a default fallback value, while actual translation is picked up from context via key specified with `k` prop.

## Providing the translations

### `Translations` object

Translations object is a simple dictionary style object that should contain all your internationalized strings. You can use aether `string` or a `number` as a key to identify the translation, and values can be templates string using `{0..}` as placeholders.

All translations are stored in the ContextAPI to be accessible in all components used by your application. Root of your internationalized app has to be wrapped with a provider that initializes the ContextAPI as well as settings. It can be done in two ways:

### `<I18nProvider />` component

Your app should we wrapped at the root level, pass the translation object using the `translations` prop:

```js
<I18nProvider translations={translations}>
  <AppRoot {...props} />
</I18nProvider>
```

### `withI18nProvider()` higher order component

Instead of adding node to the JSX you can wrap your root component export with a HOC:

```jsx
export default withI18nProvider(I18nExamples, translations)
```

## Accessing the translations

There are 3 main use cases / scenarios that this library supports - accessing them directly in JSX, using a function to obtain the value and a Higher Order Component to bind translations to props of a component. We will explain each usage with an example:

### `<I18n />` directly in JSX

The `<I18n />` component should be used, when the text in your component is static and bound to the component itself.

```jsx
<p>
  <I18n k="example.key.1">Default fallback text</I18n>
</p>
```

##### API

| prop       | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `k`        | `string \| number`     | true     | -            | key value used to look up the translation in the `Translations` object.                                                        |
| `children` | `string`               | true     | -            | The default fallback value to render in case when value under the `k` key has not been found                                   |
| `args`     | `(string \| number)[]` | false    | null         | Set of arguments to be used for string formatting with the template. Please see [**Formatting**](#Formatting) for more details |

---

### `useI18n()` react hook

React hook `useI18n()` can be used to access a selector function in a scope of a component, to obtain translations values and reuse them for some calculations / building the composition props. Typical scenario would be getting the value to be passed down as a non JSX prop into some component that takes content/translations as dynamic.

```jsx
const i18n = useI18n();

<Component
  strongText={i18n('example.prop.strong', 'Default prop.strong text')} />
</Component>
```

##### API

| param      | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `k`        | `string \| number`     | true     | -            | key value used to look up the translation in the `Translations` object.                                                        |
| `notFound` | `string`               | true     | -            | The default fallback value to render in case when value under the `k` key has not been found                                   |
| `...args`  | `(string \| number)[]` | false    | null         | Set of arguments to be used for string formatting with the template. Please see [**Formatting**](#Formatting) for more details |

---

### `withI18n()` Higher Order Component

In case you would like to bind components props to some internationalized content (in a similar way as you would bind a component to a data provided by a redux store) you can use a `withI18n()` HOC to export a component as internationalized.

```jsx
const mapI18nToProps = i18n => ({
  strongText: i18n('example.hoc.strong', 'Default value for HOC'),
})

const TranslatedComponent = withI18n(Component, mapI18nToProps)
```

`mapI18nToProps` is a selector function, similar to `react-redux` `mapStateToProps` that allows you to access `i18n` selector function and map your translations to component props.

##### API

`hoc`:

| param            | type                                       | required | defaultValue | Description                                                         |
| ---------------- | ------------------------------------------ | -------- | ------------ | ------------------------------------------------------------------- |
| `component`      | `React.ComponentType`                      | true     | -            | An react component that we want to bind internationalized props to. |
| `mapI18nToProps` | `(i18n: I18nSelector) => TranslatedProps)` | true     | -            | Selector function to be called when mapping translations to props.  |

`i18n` selector:

| param      | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `k`        | `string \| number`     | true     | -            | key value used to look up the translation in the `Translations` object.                                                        |
| `notFound` | `string`               | true     | -            | The default fallback value to render in case when value under the `k` key has not been found                                   |
| `...args`  | `(string \| number)[]` | false    | null         | Set of arguments to be used for string formatting with the template. Please see [**Formatting**](#Formatting) for more details |

---

## Formatting

All translations accessing functions / components support formatting via [`format-to-jsx`](https://www.npmjs.com/package/format-to-jsx). The formatting params for the template can be passed either by args when using selector from react hook / Higher Order Component, or with a args prop:

```jsx
/// example.key.1 = "Some string with {0}"
<p>
  <I18n k="example.key.1" args={['template']}>{`Default fallback text {0}`}</I18n>
</p>

// Will render
// <p>Some string with template</p>
```

```jsx
const i18n = useI18n();

<Component
  strongText={i18n('example.prop.strong', 'Default prop.strong text {0}', 'replaced value')} />
</Component>

// strongText = "prop.strong text replaced value"
```

For more details on usage of formatting please check the [`format-to-jsx`](https://www.npmjs.com/package/format-to-jsx) documentation page!
