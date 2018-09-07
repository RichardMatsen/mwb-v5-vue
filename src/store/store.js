import Vue from 'vue'
import Vuex from 'vuex'

import config from './modules/config.store'
import pages from './modules/pages.store'
import measures from './modules/measures.store'
import user from './modules/user.store'
import ui from './modules/ui.store'
import loadStatus from './modules/load-status.store'
import search from './modules/search.store'

Vue.use(Vuex)

const addTagToType_StorePlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.payload && mutation.payload.tag) {
      mutation.type = `${mutation.type} / ${mutation.payload.tag}` 
    }
  })
}

const modules = {
  config,
  pages,
  measures,
  user,
  ui,
  loadStatus,
  search
}

export const flatStateGetters = (modules) => {
  const result = {}
  Object.keys(modules).forEach(moduleName => {
    Object.keys(modules[moduleName].state).forEach(propName => {
      result[propName] = (state) => state[moduleName][propName]; 
    })
  })
  return result;
}

export const store = new Vuex.Store({
  modules,
  plugins: [addTagToType_StorePlugin], 
  getters: flatStateGetters(modules)
})
