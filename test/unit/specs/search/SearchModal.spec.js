/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import SearchModal from '@/search/SearchModal.vue'
import router from '@/router/routes.js'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'
import { servicesInjector } from '@/testing-utils/test-services.injector'
import SearchService from '@/search/search.service'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('SearchModal.vue', () => {

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
      wrapper = mount(SearchModal, mountOptions)
    });
  
    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    describe('result display', () => {

      it('resultDisplay method should format the result with count', () => {
        const result = wrapper.vm.resultDisplay({file: {name: 'filename'}, count: 3})
        expect(result).to.equal('filename has 3 matches')
      })
  
      it('resultDisplay method should format the result without count', () => {
        const result = wrapper.vm.resultDisplay({file: {name: 'filename'}})
        expect(result).to.equal('filename')
      })
  
      it('resultDisplay method should format the result with a generic message', () => {
        const result = wrapper.vm.resultDisplay('some message')
        expect(result).to.equal('some message')
      })
  
      it('resultDisplay method should format an empty result', () => {
        const result = wrapper.vm.resultDisplay({})
        expect(result).to.equal('')
      })
    })
  })
  
})
