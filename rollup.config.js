import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
import path from 'path';

const pkg = require(path.resolve(process.cwd(), './package.json'));

const simpleName = pkg.name.replace(/(\W)(\w)(\w*)/gm, '$2$3');

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const external = [...Object.keys(pkg.peerDependencies || {})];

const getEntryFile = f => {
  const isDir = fs.lstatSync(`./src/${f}`).isDirectory();
  if (isDir) {
    if (fs.existsSync(`./src/${f}/index.ts`)) return `./src/${f}/index.ts`;
    if (fs.existsSync(`./src/${f}/index.tsx`)) return `./src/${f}/index.tsx`;
    return null;
  } return `./src/${f}`;
};

const inputModules = fs.readdirSync('./src').reduce((acc, m) => {
  const entryPoint = getEntryFile(m);
  if (!entryPoint) return acc;
  const fileName = path.parse(m).name;
  return {
    ...acc,
    [fileName]: entryPoint
  };
}, {});

const plugins = [
  commonjs({ include: /node_modules/ }),
  // Allows node_modules resolution
  resolve({ extensions, mainFields: ['module', 'main'] }),

  // Compile TypeScript/JavaScript files
  babel({ configFile: '../../babel.config.js', extensions, include: ['src/**/*'] }),
  terser()
];

export default [{
  input: {
    ...inputModules
  },
  external,
  plugins,
  output: [
    {
      dir: 'lib',
      format: 'esm'
    },
    {
      dir: 'lib/cjs',
      format: 'cjs'
    }
  ]
},
{
  input: './src/index.ts',
  external,
  plugins,
  output: [
    { file: `./lib/${simpleName}.umd.js`, format: 'umd', name: simpleName }
  ]
}];