/* eslint-disable no-undef */
/* eslint-disable no-unused-labels */
import Vuex from 'vuex'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import ResultHeader from '@/review-pages/components/ResultHeader.vue'
import { formatDate } from '@/common/date.filter'
import { createMockStore, fileInfo } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockStore, wrapper
const propsData = { page: 'somepage' }
const createWrapper = () => {
  const mountOptions = {
    store: mockStore, 
    localVue,
    propsData
  }
  wrapper = mount(ResultHeader, mountOptions)
}

describe('ResultHeader', () => {

  beforeEach( () => {
    mockStore = createMockStore()
    createWrapper()
  });

  describe('static', () => {

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })
  
    it('renders the title', () => {
      expect(wrapper.find('.titleText').text().trim()).to.equal(fileInfo.name)
    })
    
    it('renders an error badge', () => {
      expect(wrapper.find('error-badge')).to.be.ok
    })
    
    it('renders a search result indicator', () => {
      expect(wrapper.find('search-indicator')).to.be.ok
    })
    
    it('renders last modified date', () => {
      expect(wrapper.find('h6 span').text().trim())
        .to.equal('Last modified: ' + formatDate(fileInfo.lastModified, 'DD MMM YYYY'))
    })
  
    it('renders a refresh button', () => {
      expect(wrapper.find('h2 a.refresh-page-button i.fa-refresh')).to.be.ok
    })

    it('renders last refresh time', () => {
      expect(wrapper.findAll('h6.last-refresh-label span').at(1).text().trim())
        .to.equal('2016-07-07 10:22 am')
    })
  })
  
  describe('when fileInfo is not set', () => {

    beforeEach( () => {
      mockStore = createMockStore('somepage', {fileInfo: null})
      createWrapper()
    });

    it('renders an empty title', () => {
      expect(wrapper.find('.titleText').text().trim()).to.equal('')
    })
  })

})
