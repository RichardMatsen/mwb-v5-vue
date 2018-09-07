/* eslint-disable no-undef */
import Vuex from 'vuex'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import ListLimiter from '@/review-pages/components/ListLimiter.vue'
import { createMockStore, fileInfo } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockStore, wrapper
const propsData = { page: 'somepage', displayIncrement: 5, tooltip: 'some tooltip' }
const createWrapper = () => {
  const mountOptions = {
    store: mockStore, 
    localVue,
    propsData
  }
  wrapper = shallow(ListLimiter, mountOptions)
}

describe('ListLimiter', () => {

  beforeEach( () => {
    mockStore = createMockStore()
    createWrapper()
  });

  describe('static', () => {

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })
  
    it('renders the chevron', () => {
      expect(wrapper.find('li span.moreChevron a i.fa-angle-double-down')).to.be.ok
    })
    
    it('the chevron is enabled when there is more to show', () => {
      expect(wrapper.find('li span.moreChevron').classes()).not.to.contain('disabled'); 
    })
  })

  describe('when full list is displayed', () => {

    it('the chevron is disabled when there is no more to show', () => {
      mockStore = createMockStore('somepage', {numVisible: 3})
      createWrapper()
      expect(wrapper.find('li span.moreChevron').classes()).to.contain('disabled'); 
    })
  })

  describe('clicking the chevron', () => {

    it('calls showMore method', () => {
      const showMoreSpy = sinon.stub(ListLimiter.methods, 'showMore')
      createWrapper()
      wrapper.find('li span.moreChevron a').trigger('click')
      expect(showMoreSpy).to.be.calledWith()
      showMoreSpy.restore()
    })

    it('calls store dispatch method', () => {
      mockStore = createMockStore()
      const storeDispatchStub = sinon.stub(mockStore, 'dispatch')
      createWrapper()
      wrapper.find('li span.moreChevron a').trigger('click')
      expect(storeDispatchStub)
        .to.be.calledWith('pages/updateNumVisible', { numVisible: 7, page: "somepage", tag: "somepage" })
      storeDispatchStub.restore()
    })
  })

})
