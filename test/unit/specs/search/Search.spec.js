/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Search from '@/search/Search.vue'
import router from '@/router/routes.js'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'
import { servicesInjector } from '@/testing-utils/test-services.injector'
import SearchService from '@/search/search.service'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Search.vue', () => {

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
      wrapper = mount(Search, mountOptions)
    });
  
    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    it('should clear search term', () => {
      wrapper.vm.searchTerm = 'search this'
      wrapper.vm.searchClear()
      expect(wrapper.vm.searchTerm).to.equal('')
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
