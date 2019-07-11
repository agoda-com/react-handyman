# 👨‍🔧 React handyman
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

This is a monorepo containing all packages that can help you extend functionalities of your react.js based application. For detailed documentation about each package, checkout each README file for each package.

---

[![npm](https://img.shields.io/npm/v/i18n-jsx.svg)](https://www.npmjs.com/package/i18n-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/i18n-jsx.svg)](https://bundlephobia.com/result?p=i18n-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master&service=github)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)

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

[![npm](https://img.shields.io/npm/v/format-to-jsx.svg)](https://www.npmjs.com/package/format-to-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/format-to-jsx.svg)](https://bundlephobia.com/result?p=format-to-jsx)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![Coverage Status](https://coveralls.io/repos/github/matmalkowski/react-handyman/badge.svg?branch=master&service=github)](https://coveralls.io/github/matmalkowski/react-handyman?branch=master)

# [format-to-jsx](/packages/format-to-jsx)

Easy string formatting with support of injecting JSX elements and object based params

```ts
format('Example {1} with different placeholders order {0}', 1, 2)
// Example 2 with different placeholders order 1

format('Example {two} with different placeholders order {one}', { one: 1, two: 2 })
// Example 2 with different placeholders order 1

format('Example {1} with different placeholders order {0}', 1, <strong>2</strong>)
// <>Example <strong>2</strong> with different placeholders order 1<>
```

Check out details and more examples in [package README file](/packages/format-to-jsx).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://medium.com/@mat.malkowski"><img src="https://avatars3.githubusercontent.com/u/1546903?v=4" width="100px;" alt="Maciej Małkowski"/><br /><sub><b>Maciej Małkowski</b></sub></a><br /><a href="https://github.com/matmalkowski/react-handyman/commits?author=matmalkowski" title="Code">💻</a> <a href="https://github.com/matmalkowski/react-handyman/commits?author=matmalkowski" title="Documentation">📖</a> <a href="https://github.com/matmalkowski/react-handyman/commits?author=matmalkowski" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/znut"><img src="https://avatars2.githubusercontent.com/u/1188327?v=4" width="100px;" alt="Nut Sornchumni"/><br /><sub><b>Nut Sornchumni</b></sub></a><br /><a href="#review-znut" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/matmalkowski/react-handyman/commits?author=znut" title="Code">💻</a> <a href="https://github.com/matmalkowski/react-handyman/commits?author=znut" title="Documentation">📖</a> <a href="https://github.com/matmalkowski/react-handyman/commits?author=znut" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/PoomSmart"><img src="https://avatars3.githubusercontent.com/u/3608783?v=4" width="100px;" alt="Thatchapon Unprasert"/><br /><sub><b>Thatchapon Unprasert</b></sub></a><br /><a href="https://github.com/matmalkowski/react-handyman/commits?author=PoomSmart" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!