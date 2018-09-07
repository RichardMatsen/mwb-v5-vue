/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import { servicesInjector } from '@/testing-utils/test-services.injector'

import App from '@/App'
import router from '@/router/routes'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()

describe('App component', () => {

  let mockStore, wrapper

  beforeEach( () => {
    mockStore = createMockStore()
  });

  beforeEach( () => {
    const mountOptions = {
      store: mockStore, 
      router: router,
      localVue,
      propsData: { },
    }
    wrapper = shallow(App, mountOptions)
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

});
