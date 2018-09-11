/* eslint-disable no-undef */
/* eslint-disable no-unused-labels */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import vMediaQuery from 'v-media-query'
import {
  mount,
  shallow,
  createLocalVue,
  cloneDeep
} from '@vue/test-utils'
import flushPromises from 'flush-promises'

import PageCommon from '@/review-pages/PageCommon.vue'
import ConfigService from '@/services/config.service'
import DataService from '@/services/data.service'
import router from '@/router/routes'
import {
  interceptor
} from '@/testing-utils/test-interceptor'
import {
  createMockStore,
  config
} from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(vMediaQuery)
localVue.use(VueResource);

let mockStore, mockedServices, wrapper
const thisPage = 'clinics'

const propsData = {
  page: 'clinics',
  namespace: 'pages'
}
const createWrapper = () => {
  const mountOptions = {
    store: mockStore,
    localVue,
    propsData
  }
  wrapper = mount(PageCommon, mountOptions)
}

describe('PageCommon', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('static', () => {

    beforeEach(() => {
      mockStore = createMockStore(thisPage)
      createWrapper()
    });

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    it('renders the title', () => {
      expect(wrapper.find('div.bannertitle-container h1').text().trim()).to.equal(config.page.pageTitle)
    })

    it('renders the description', () => {
      expect(wrapper.find('div.bannertitle-container small').text().trim()).to.equal(config.page.pageDescription)
    })

    it('renders the Search component', () => {
      expect(wrapper.find('form.search').exists()).to.equal(true)
    })

    it('renders the FileList component', () => {
      expect(wrapper.find('div#filelist').exists()).to.equal(true)
    })

    it('renders the ResultHeader component', () => {
      expect(wrapper.find('div.resultHeader').exists()).to.equal(true)
    })

    it('renders the ResultWrapper component', () => {
      expect(wrapper.find('div.resultWrapper').exists()).to.equal(true)
    })

  })

  describe('when config is not yet loaded', () => {

    beforeEach(() => {
      const checkConfigSpy = sinon.spy(ConfigService, 'checkConfig')
      const checkFilesSpy = sinon.spy(DataService, 'checkFiles')
      mockStore = createMockStore(thisPage)
      createWrapper()
    })

    afterEach(() => {
      ConfigService.checkConfig.restore()
      DataService.checkFiles.restore()
    })

    it('should call ConfigService.checkConfig', async () => {
      await flushPromises()
      expect(ConfigService.checkConfig.calledOnce).to.equal(true)
    })

  })

})
