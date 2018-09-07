/* eslint-disable no-undef */
/* eslint-disable no-unused-labels */
import Vuex from 'vuex'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import ResultWrapper from '@/review-pages/components/ResultWrapper.vue'
import { formatDate } from '@/common/date.filter'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockStore, wrapper
const propsData = { page: 'somepage', content: '<div>some content</div>', zoom: '97%' }
const createWrapper = () => {
  const mountOptions = {
    store: mockStore, 
    localVue,
    propsData
  }
  wrapper = shallow(ResultWrapper, mountOptions)
}

describe('ResultWrapper', () => {

  beforeEach( () => {
    mockStore = createMockStore()
    createWrapper()
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('renders the content', () => {
    expect(wrapper.find('div#dataContainer').html()).to.contain(propsData.content)
  })
  
  it('should set zoom', () => {
    expect(wrapper.find('div#dataContainer').element.style.zoom).to.equal('97%')
  })

  describe('when content changes', () => {
    it('should change the DOM', () => {
      expect(wrapper.find('div#dataContainer').html()).to.contain(propsData.content)
      wrapper.setProps({ content: '<div>some other content</div>' })
      expect(wrapper.find('div#dataContainer').html()).to.contain('<div>some other content</div>')
    })
  })

})
