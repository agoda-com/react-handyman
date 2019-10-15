import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {
  terser
} from 'rollup-plugin-terser'

import pkg from './package.json'

const extensions = ['.ts', '.tsx']

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: Object.keys(pkg.peerDependencies) || [],

  plugins: [
    // Allows node_modules resolution
    resolve({
      extensions,
      mainFields: ['module', 'main']
    }),

    // Compile TypeScript/JavaScript files
    babel({
      configFile: '../../babel.config.js',
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**'
    }),
    terser(),
  ],

  output: [{
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'fastNumberFormatter',
    },
  ],
}