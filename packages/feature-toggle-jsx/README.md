[![npm](https://img.shields.io/npm/v/feature-toggle-jsx.svg)](https://www.npmjs.com/package/feature-toggle-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/feature-toggle-jsx.svg)](https://bundlephobia.com/result?p=feature-toggle-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master&service=github)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)

# feature-toggle-jsx

Simple feature toggle for your React component

```bash
yarn add feature-toggle-jsx

# or with npm

npm install feature-toggle-jsx --save
```

## Example

```jsx
// ChatComponent
import { withFeature } from "feature-toggle-jsx"
const ChatComponent = _ => {...}

export default withFeature(ChatComponent, "chat")

// ImagePreview
import { withFeature } from "feature-toggle-jsx"
const ImagePreviewComponent = ({ otherProps, perPage }) => {...}

export default withFeature(ImagePreviewComponent, "preview")

// Entry
import { FeatureProvider } from "feature-toggle-jsx"
import ChatComponent from "./ChatComponent"
import ImagePreviewComponent from "./ImagePreviewComponent"

...
const features = {
  chat: {},
  preview: {
    perPage: 3,
  },
}

...
<App>
  <FeatureProvider features={features}>
    <ChatComponent />
    ...
    <ImagePreviewComponent otherProps={...}>
  </FeatureProvider>
</App>
```

## Setup feature flags and configuration provider

### Feature flag object (aka. the feature configurations)

Feature configuration is a map of feature name and its configurations,
or empty object if there is no extra configuration.

Extra configurations will be passed to component and can be used directly
via props.

Feature flag configuration shape is:

```js
{
  featureName: {
    opt1: "1",
    opt2: 2,
    opt3: [3, 4, 5],
  },
  chat: {},
  preview: {
    perPage: 3,
  },
}
```

### `<FeaturesProvider />` component

```jsx
<FeaturesProvider features={features}>
  <App />
</FeaturesProvider>
```

### `withFeaturesProvider()` higher order component

```jsx
export default withFeaturesProvider(App, features)
```

## Consuming feature flag

### `useFeature(name: string)` React hook

```jsx
const feature = useFeature('chat')

if (feature) {
  // do something, render Chat component
} else {
  // "chat" feature is not enabled
}
```

##### API

| param      | type                   | required | defaultValue | Description                                                                                                                    |
| ---------- | ---------------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `k`        | `string \| number`     | true     | -            | key value used to look up the translation in the `Translations` object.                                                        |
| `notFound` | `string`               | true     | -            | The default fallback value to render in case when value under the `k` key has not been found                                   |
| `...args`  | `(string \| number)[]` | false    | null         | Set of arguments to be used for string formatting with the template. Please see [**Formatting**](#Formatting) for more details |

---

### `withFeature(c: Component, name: string)` Higher Order Component

```jsx
export default withFeature(ChatComponent, 'chat')
```

##### API

`hoc`:

| param            | type                                       | required | defaultValue | Description                                                         |
| ---------------- | ------------------------------------------ | -------- | ------------ | ------------------------------------------------------------------- |
| `component`      | `React.ComponentType`                      | true     | -            | An react component that we want to bind internationalized props to. |
| `mapI18nToProps` | `(i18n: I18nSelector) => TranslatedProps)` | true     | -            | Selector function to be called when mapping translations to props.  |
