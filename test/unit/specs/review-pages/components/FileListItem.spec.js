/* eslint-disable no-undef */
import Vuex from 'vuex'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import FileListItem from '@/review-pages/components/FileListItem.vue'
import { createMockStore, files } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockStore, wrapper
const propsData = { item: files[0] }
const createWrapper = () => {
  const mountOptions = {
    store: mockStore, 
    localVue,
    propsData
  }
  wrapper = shallow(FileListItem, mountOptions)
}

describe('FileListItem', () => {

  beforeEach( () => {
    mockStore = createMockStore()
    createWrapper()
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('renders the item displayName', () => {
    expect(wrapper.find('.display-name').text().trim()).to.equal(propsData.item.displayName)
  })
  
  it('renders the item effectiveTime', () => {
    expect(wrapper.find('.effective-time').text().trim())
      .to.equal(propsData.item.effectiveTime.slice(0,-3) + ' am')
  })
  
  it('renders an error badge', () => {
    expect(wrapper.find('error-badge')).to.be.ok
  })
  
})
