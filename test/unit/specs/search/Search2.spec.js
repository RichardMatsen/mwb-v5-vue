/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Search2 from '@/search/Search2.vue'
import router from '@/router/routes.js'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'
import { servicesInjector } from '@/testing-utils/test-services.injector'
import SearchService from '@/search/search.service'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Search2.vue', () => {

  let mockStore, wrapper

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('static', () => {

    beforeEach( () => {
      mockStore = createMockStore('clinics')
      localVue.use(servicesInjector);
      const mountOptions = {
        store: mockStore, 
        router: router,
        localVue,
        propsData: { page: 'somepage' },
      }
      wrapper = mount(Search2, mountOptions)
    });
  
    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    it('should set state to closed on clear', () => {
      wrapper.vm.searchTerm = 'search this'
      wrapper.vm.searchClear()
      expect(wrapper.vm.state).to.equal('closed')
    })

    it('should clear search results', () => {
      const searchSpy = sinon.stub(SearchService, 'clearResults')
      wrapper.vm.searchClear()
      expect(searchSpy).to.be.calledWith()
      searchSpy.restore()
    })

    it('should run search', () => {
      const searchSpy = sinon.stub(SearchService, 'getResults')
      wrapper.vm.searchTerm = 'search this'
      wrapper.vm.search()
      expect(searchSpy).to.be.calledWith()
      searchSpy.restore()
    })

  })
  
})
