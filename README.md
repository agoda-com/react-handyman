# React handyman

This is a monorepo containing all packages that can help you extend functionalities of your react.js based application. For detailed documentation about each package, checkout each README file for each package.

---

[![npm](https://img.shields.io/npm/v/i18n-jsx.svg)](https://www.npmjs.com/package/i18n-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)

# [i18n-jsx](/packages/i18n-jsx)

React (JS) text internationalization and externalizing. Supports string formatting and fallback to default values.

```jsx
import { I18n } from 'i18n-jsx'

const I18nExamples: React.FC = () => {
  return (
    <p>
      <I18n k="example.key.1">Default fallback text that should not render</I18n>
    </p>
  )
}
```

With `example.key.1` translation key set up as

```
'This is text under example.key.1 value'
```

I18nExamples component will render:

```html
<p>This is text under example.key.1 value</p>
```

Check out details and more examples in [package README file](/packages/i18n-jsx).
