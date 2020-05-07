[![npm](https://img.shields.io/npm/v/feature-toggle-jsx.svg)](https://www.npmjs.com/package/feature-toggle-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/feature-toggle-jsx.svg)](https://bundlephobia.com/result?p=feature-toggle-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![dependabot badge](https://badgen.net/dependabot/matmalkowski/react-handyman/?icon=dependabot.svg)](https://dependabot.com/)
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

export default withFeature(ImagePreviewComponent, "preview", _ => _.perPage == 2) // will only render if feature perPage value meets the selector criteria.
```

```jsx
// App
import { FeatureProvider } from "feature-toggle-jsx"

import ChatComponent from "./ChatComponent"
import ImagePreviewComponent from "./ImagePreviewComponent"

...

const features = {
  chat: {
    isEnabled: true,
  },
  preview: {
    isEnabled: true,
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

Feature configuration is a map of feature name and its configurations, with required isEnabled flag as part of config. If feature is null or undefined, it will be evaluated as disabled.

Extra configurations can be used inside of component via `useFeature` hook or can be used to select different field than `isEnabled` to evaluate feature visibility.

Feature flag configuration shape is:

```js
{
  featureName: {
    isEnabled: true,
    opt1: "1",
    opt2: 2,
    opt3: [3, 4, 5],
  },
  chat: {
    isEnabled: false,
  },
  preview: {
    isEnabled: true,
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

### `useFeature(name: string, (feature) => boolean)` React hook

```jsx
const [isEnabled, config] = useFeature('chat')

if (feature) {
  // do something, render Chat component
} else {
  // "chat" feature is not enabled
}

// or if we wanna use diferent field for selecting enabled value:
const [isEnabled, config] = useFeature('chat', _ => _.someConfigField == 0)

```
