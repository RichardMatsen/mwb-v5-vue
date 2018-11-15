import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import vMediaQuery from 'v-media-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { awaitDevtools, refreshDevtools } from "./awaitdevtools.js";
import Toasted from 'vue-toasted';
import injector from 'vue-inject';
require('@/services/injector-register');
import PortalVue from 'portal-vue'

import VueFoldable from './about/foldable/VueFoldable'
import './about/foldable/vue-foldable.css'
import './material'

import App from './App'
import router from './router/routes'
import { store } from './store/store'
import Dashboard from './dashboard/Dashboard'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.root = './static/data/'
Vue.use(Toasted, {
  position: 'top-right',
})
Vue.use(vMediaQuery)
Vue.use(injector);
Vue.use(PortalVue)

Vue.component('foldable', VueFoldable)
Vue.component('mwb-dashboard', Dashboard)

Vue.config.productionTip = false

// Ref: https://github.com/vuejs/vue-devtools/issues/124
//      https://gist.github.com/rtfleg/cc159e4f773a8a3d9ec3a0f8ca821464
awaitDevtools()
  .then(bootstrapApp)
  .then(refreshDevtools); // Refresh is required in order to deal with missing component tree and another issues.

function bootstrapApp() {
  /* eslint-disable no-new */
  const myApp = new Vue({
    el: "#app",
    router,
    store,
    template: '<App/>',
    components: {
      App
    },
    created() {
      // Dispatch some actions or make some commits here.
      // All the store changes will be reflected inside devtools :-)
    }
  });
  // add this ref to give Cypress tests access to the root app
  if (window.Cypress) { 
    window.myApp = myApp;
  }
}
