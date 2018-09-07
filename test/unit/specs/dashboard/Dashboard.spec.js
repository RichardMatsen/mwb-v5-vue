/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Dashboard from '@/dashboard/Dashboard.vue'
import router from '@/router/routes.js'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'
import ConfigService from "@/services/config.service";
import MeasureService from "@/services/measure.service";

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Dashboard.vue', () => {

  let mockStore, wrapper, checkConfigStub, updateValidationsMeasureStub

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('static', () => {

    beforeEach( () => {
      checkConfigStub = sinon.stub(ConfigService, 'checkConfig')
      checkConfigStub.returns(Promise.resolve())
      updateValidationsMeasureStub = sinon.stub(MeasureService, 'updateMeasures')
      updateValidationsMeasureStub.returns(Promise.resolve())
    });

    afterEach( () => {
      ConfigService.checkConfig.restore()
      MeasureService.updateMeasures.restore()
    });

    beforeEach( () => {
      mockStore = createMockStore('clinics')
      const mountOptions = {
        store: mockStore, 
        router: router,
        localVue,
        propsData: { },
      }
      wrapper = mount(Dashboard, mountOptions)
    });
  
    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })
  
    it('has a created hook', () => {
      expect(typeof Dashboard.created).to.equal('function')
    })
    
    it('should have title `Dashboard`', () => {
      expect(wrapper.find('h1').text()).to.equal('Dashboard')
    });
  
    it('renders a thumbnail for each measure in store.measures', () => {
      const thumbs = wrapper.findAll('.thumbnail') 
      expect(thumbs.length).to.equal(2)
  
      const errorBadges = wrapper.findAll('.error-badge')
      expect(errorBadges.wrappers[0].element.classList.contains('amaranth')).to.equal(true)
      expect(errorBadges.wrappers[1].element.classList.contains('sarcoline')).to.equal(true)
    });
  })

});
