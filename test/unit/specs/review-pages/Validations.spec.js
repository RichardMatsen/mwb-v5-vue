/* eslint-disable no-undef */
/* eslint-disable no-unused-labels */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import vMediaQuery from 'v-media-query'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Validations from '@/review-pages/Validations.vue'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(vMediaQuery)
localVue.use(VueResource);

const thisPage = 'validations'
let mockStore = createMockStore(thisPage)
let wrapper
const propsData = { page: 'somepage', content: '<div>some content</div>', zoom: '97%' }

const createWrapper = () => {
  const mountOptions = {
    store: mockStore, 
    localVue,
    propsData
  }
  wrapper = mount(Validations, mountOptions)
}

describe('Validations', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  beforeEach( () => {
    createWrapper()
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('renders page-common', () => {
    expect(wrapper.find('.bannertitle-container').exists()).to.equal(true)
  })
  
})
