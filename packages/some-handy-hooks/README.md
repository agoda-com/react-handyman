[![npm](https://img.shields.io/npm/v/some-handy-hooks.svg)](https://www.npmjs.com/package/some-handy-hooks)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/some-handy-hooks.svg)](https://bundlephobia.com/result?p=some-handy-hooks)
[![Build Status](https://travis-ci.org/matmalkowski/react-handyman.svg?branch=master)](https://travis-ci.org/matmalkowski/react-handyman)
[![codecov](https://codecov.io/gh/matmalkowski/react-handyman/branch/master/graph/badge.svg)](https://codecov.io/gh/matmalkowski/react-handyman)
[![Greenkeeper badge](https://badges.greenkeeper.io/matmalkowski/react-handyman.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# some-handy-hooks

Bunch of handy hooks for your react application!

```bash
yarn add some-handy-hooks

# or with npm

npm install some-handy-hooks --save
```

## useCountdown() hook

Creates a countdown with 1 sec interval, that will return on each render complete set of time variables as well as total time elapsed + onFinish callback can be passed to handle the logic.

```ts
import { useCountdown } from 'some-handy-hooks'

const { seconds, minutes, totalSeconds } = useCountdown({minutes: 20})

```
