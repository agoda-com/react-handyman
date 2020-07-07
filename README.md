# 👨‍🔧 React handyman

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![dependabot badge](https://badgen.net/dependabot/agoda-com/react-handyman/?icon=dependabot.svg)](https://dependabot.com/)

This is a monorepo containing all packages that can help you extend functionalities of your react.js based application. For detailed documentation about each package, checkout each README file for each package.

---

# [ab-test-jsx](/packages/ab-test-jsx)

[![npm](https://img.shields.io/npm/v/ab-test-jsx.svg)](https://www.npmjs.com/package/ab-test-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ab-test-jsx.svg)](https://bundlephobia.com/result?p=ab-test-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)

React (JS) based client for consuming AB test logic in your app.

Do conditional rendering based on experiment allocation in your JSX with help of `ABTest` component:

```jsx
import { ABTest } from 'ab-test-jsx'

const Header: React.FC = () => (
  <>
    <ABTest name="header-experiment" variant="A">
      <h1>Old header implementation</span>
    </ABTest>
    <ABTest name="header-experiment" variant="B">
      <h2>New header!</h2>
    </ABTest>
  </>
)
```

Use custom hook to access allocation results and implement custom logic in your components:

```jsx
const SearchBox: React.FC = () => {
  const { isB } = useABTests()
  const apiEndpoint = isB('use-new-api') ? newApiUrl : apiUrl
  return <Autocomplete api={apiEndpoint} />
}
```

Please see more examples, detailed documentation and other available components in the [package README file](/packages/ab-test-jsx)!

---

# [feature-toggle-jsx](/packages/feature-toggle-jsx)

[![npm](https://img.shields.io/npm/v/feature-toggle-jsx.svg)](https://www.npmjs.com/package/feature-toggle-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/feature-toggle-jsx.svg)](https://bundlephobia.com/result?p=feature-toggle-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)

Toggle visibility of your react components based on features configuration of your app.

```jsx
// HOC
export default withFeature(ChatComponent, 'chat')
export default withoutFeature(PlaceholderComponent, 'chat')
// with custom selector
export default withFeature(ChatComponent, 'chat', _ => _.someConfigValue == true)

// Hook
const [isEnabled, config] = useFeature('chat')

const [isEnabled] = useFeature('chat' _ => _.someConfigValue == 4)
```

Check out details and more examples in [package README file](/packages/feature-toggle-jsx).

---

# [i18n-jsx](/packages/i18n-jsx)

[![npm](https://img.shields.io/npm/v/i18n-jsx.svg)](https://www.npmjs.com/package/i18n-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/i18n-jsx.svg)](https://bundlephobia.com/result?p=i18n-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)

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

---

# [format-to-jsx](/packages/format-to-jsx)

[![npm](https://img.shields.io/npm/v/format-to-jsx.svg)](https://www.npmjs.com/package/format-to-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/format-to-jsx.svg)](https://bundlephobia.com/result?p=format-to-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)

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

# [error-boundary-jsx](/packages/error-boundary-jsx)

[![npm](https://img.shields.io/npm/v/error-boundary.svg)](https://www.npmjs.com/package/error-boundary-jsx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/error-boundary.svg)](https://bundlephobia.com/result?p=error-boundary-jsx)
[![Build Status](https://travis-ci.org/agoda-com/react-handyman.svg?branch=master)](https://travis-ci.org/agoda-com/react-handyman)
[![codecov](https://codecov.io/gh/agoda-com/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/agoda-com/react-handyman)

Handle errors on wrapped component and provide a fall back.

```ts
import ErrorBoundary from 'error-boundary-jsx'

<ErrorBoundary onError={componentErrorHandler} name="component name" FallbackComponent={CustomFallbackComponent}>
    ...component tree to handle errors
</ErrorBoundary>
```

Check out details and more examples in [package README file](/packages/error-boundary-jsx).

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://medium.com/@mat.malkowski"><img src="https://avatars3.githubusercontent.com/u/1546903?v=4" width="100px;" alt=""/><br /><sub><b>Maciej Małkowski</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=matmalkowski" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=matmalkowski" title="Documentation">📖</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=matmalkowski" title="Tests">⚠️</a> <a href="https://github.com/agoda-com/react-handyman/pulls?q=is%3Apr+reviewed-by%3Amatmalkowski" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/znut"><img src="https://avatars2.githubusercontent.com/u/1188327?v=4" width="100px;" alt=""/><br /><sub><b>Nut Sornchumni</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=znut" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=znut" title="Documentation">📖</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=znut" title="Tests">⚠️</a> <a href="https://github.com/agoda-com/react-handyman/pulls?q=is%3Apr+reviewed-by%3Aznut" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/PoomSmart"><img src="https://avatars3.githubusercontent.com/u/3608783?v=4" width="100px;" alt=""/><br /><sub><b>Thatchapon Unprasert</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=PoomSmart" title="Documentation">📖</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=PoomSmart" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=PoomSmart" title="Tests">⚠️</a> <a href="https://github.com/agoda-com/react-handyman/pulls?q=is%3Apr+reviewed-by%3APoomSmart" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/nickyshannon"><img src="https://avatars0.githubusercontent.com/u/2579455?v=4" width="100px;" alt=""/><br /><sub><b>nickyshannon</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=nickyshannon" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=nickyshannon" title="Tests">⚠️</a> <a href="https://github.com/agoda-com/react-handyman/pulls?q=is%3Apr+reviewed-by%3Anickyshannon" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Nielsie"><img src="https://avatars0.githubusercontent.com/u/11413207?v=4" width="100px;" alt=""/><br /><sub><b>Nielsie</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=Nielsie" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=Nielsie" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/mahmudul-hassan-06853b50/"><img src="https://avatars2.githubusercontent.com/u/2369887?v=4" width="100px;" alt=""/><br /><sub><b>Md Mahmudul Hasan</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=dinujubd" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=dinujubd" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/HasanAJ"><img src="https://avatars0.githubusercontent.com/u/29162870?v=4" width="100px;" alt=""/><br /><sub><b>Hasan AJ</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=HasanAJ" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://m2film.dk/"><img src="https://avatars1.githubusercontent.com/u/23518653?v=4" width="100px;" alt=""/><br /><sub><b>Soren Ullidtz</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=Ullidtz" title="Code">💻</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=Ullidtz" title="Tests">⚠️</a> <a href="https://github.com/agoda-com/react-handyman/commits?author=Ullidtz" title="Documentation">📖</a></td>
    <td align="center"><a href="http://facebook.com/kingdomax"><img src="https://avatars2.githubusercontent.com/u/6430428?v=4" width="100px;" alt=""/><br /><sub><b>Pramoch Viriyathomrongul</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=kingdomax" title="Code">💻</a></td>
    <td align="center"><a href="https://tmr.in.th"><img src="https://avatars2.githubusercontent.com/u/8011543?v=4" width="100px;" alt=""/><br /><sub><b>Thammarith</b></sub></a><br /><a href="https://github.com/agoda-com/react-handyman/commits?author=thammarith" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
