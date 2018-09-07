// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'eslint:recommended',
    // 'plugin:vue/recommended' // or 'plugin:vue/base'
  ],
  // required to lint *.vue files
  plugins: [
    'html', 'promise'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-property-newline': 0,
    'semi': 0,
    'no-trailing-spaces': 0,
    'space-in-parens': 0,
    'arrow-parens': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 0,
    'keyword-spacing': 0,
    'comma-dangle': 0,
    'no-useless-escape': 0,
    // 'no-undef': 0,
    'no-console': 0,
    'promise/no-undef': 'off',
  }
}
