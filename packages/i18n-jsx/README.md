[![npm](https://img.shields.io/npm/v/i18n-jsx.svg)](https://www.npmjs.com/package/i18n-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)

# i18n-jsx

> 👉 Take note that this package is in still early stage of developement, and there might be breaking changes introduced while we are on the roadmap to stable 1.0.0 version. To check the progress and what will be supported see our [**Roadmap**](/packages/i18n-jsx/ROADMAP.md)

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

### `<I18m />` directly in JSX

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
