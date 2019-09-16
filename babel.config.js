module.exports = {
  presets: [
    "@babel/preset-env",
    '@babel/preset-react',
    '@babel/typescript'
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
