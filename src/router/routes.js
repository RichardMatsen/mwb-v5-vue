/* eslint-disable no-undef */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/store'

import configstore from '../store/modules/config.store'
store.registerModule('test', configstore);

/* istanbul ignore next */
const Dashboard = resolve => {
  require.ensure(['@/dashboard/Dashboard'], () => {
    resolve(require('@/dashboard/Dashboard'));
  }, 'dashboard');
}
/* istanbul ignore next */
const Validations = resolve => {
 require.ensure(['@/review-pages/Validations'], () => {
    resolve(require('@/review-pages/Validations'));
  }, 'pages');
}
/* istanbul ignore next */
const Referentials = resolve => {
  require.ensure(['@/review-pages/Referentials'], () => {
    resolve(require('@/review-pages/Referentials'));
  }, 'pages');
}
/* istanbul ignore next */
const ReferentialsGraphComponent = resolve => {
  require.ensure(['@/graphs/referentials-graph/ReferentialsGraphComponent'], () => {
    resolve(require('@/graphs/referentials-graph/ReferentialsGraphComponent'));
  }, 'graphs');
}
/* istanbul ignore next */
const Clinics = resolve => {
  require.ensure(['@/review-pages/Clinics'], () => {
    resolve(require('@/review-pages/Clinics'));
  }, 'pages');
}
/* istanbul ignore next */
const Tasks = resolve => {
  require.ensure(['@/tasks/Tasks'], () => {
    resolve(require('@/tasks/Tasks'));
  }, 'tasks');
}
/* istanbul ignore next */
const Login = resolve => {
  require.ensure(['@/user/Login'], () => {
    resolve(require('@/user/Login'));
  }, 'user');
}
/* istanbul ignore next */
const Profile = resolve => {
  require.ensure(['@/user/Profile'], () => {
    resolve(require('@/user/Profile'));
  }, 'user');
}
/* istanbul ignore next */
const About = resolve => {
  require.ensure(['@/about/About'], () => {
    resolve(require('@/about/About'));
  }, 'about');
}
import AuthGuard from '@/user/auth-guard'

/*
  Move this to main.js
  For testing, need to overwrite $route
  Ref: https://eddyerburgh.me/stub-$route-in-vue-unit-tests
*/
// Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/validations', name: 'Validations', component: Validations },
  { 
    path: '/referentials', name: 'Referentials', component: Referentials,
    children: [
      { path: 'referentialsGraph', name: 'ReferentialsGraphComponent', 
        component: ReferentialsGraphComponent }
    ]
  },
  { path: '/clinics', name: 'Clinics', component: Clinics },
  { path: '/tasks', name: 'Tasks', component: Tasks, 
    beforeEnter: (to, from, next) => {
      if (AuthGuard.canActivate()) {
        next()
      } else {
        next({ path: `/login?returnUrl=${to.path}&prompt=Team Tasks` })
      }
    } 
  },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login,
    beforeEnter: (to, from, next) => {
      // This is required because dynamic path is not working
      const currentUser = store.state.user.currentUser
      if (currentUser) {
        next({ path: `/profile` })
      } else {
        next()
      }
    } 
  },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '*', redirect: '/dashboard' },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
