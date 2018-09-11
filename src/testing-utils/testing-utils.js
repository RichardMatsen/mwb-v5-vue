import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import injector from 'vue-inject';
import {
  mount as vtu_mount,
  shallow,
  createLocalVue,
  cloneDeep
} from '@vue/test-utils'
require('@/services/injector-register'); // eslint-disable-line no-undef

Vue.use(Vuex)
Vue.use(injector);
Vue.use(VueResource)

export default {
  mount(component, options) {
    return mount(component, options)
  }
}

const mount = (component, options) => {
  const wrapper = vtu_mount(component, options)
  if (options.mockInjects) {
    wrapper.vm = { ...wrapper.vm,
      ...options.mockInjects
    }
  }
  return wrapper
}
