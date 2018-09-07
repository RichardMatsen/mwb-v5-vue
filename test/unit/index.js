import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)  // eslint-disable-line no-undef
// const testsContext = require.context('./specs', true, 'App.spec.js')
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, // eslint-disable-line no-undef
  /^\.\/(?!main(\.js)?$)(?!awaitdevtools(\.js)?$)(?!routes(\.js)?$)(?!.+\.html$)/
) 
srcContext.keys().forEach(srcContext)
