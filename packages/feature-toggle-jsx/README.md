[![npm](https://img.shields.io/npm/v/feature-toggle-jsx.svg)](https://www.npmjs.com/package/feature-toggle-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/feature-toggle-jsx.svg)](https://bundlephobia.com/result?p=feature-toggle-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master&service=github)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
```

```jsx
// ImagePreview
import { withFeature } from "feature-toggle-jsx"
const ImagePreviewComponent = ({ props, perPage }) => {...}

export default withFeature(ImagePreviewComponent, "preview")
```

```jsx
// App
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

### `withFeaturesProvider()` HOC

```jsx
export default withFeaturesProvider(App, features)
```

## Consuming feature flags

### `useFeature(names: string[])` React hook

```jsx
const [feature] = useFeatures('chat')

if (feature) {
  // do something, render Chat component
} else {
  // "chat" feature is not enabled
}
```

If the configuration contains extra configuration:

```jsx
const [feature] = useFeatures('preview')

// feature -> { perPage: 3 }
```

---

### `withFeature(c: Component, name: string)` HOC

```jsx
export default withFeature(ChatComponent, 'chat')
```
