/* eslint-disable no-undef */
import Vuex from 'vuex'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import FileList from '@/review-pages/components/FileList.vue'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockStore, wrapper
const propsData = { page: 'somepage', title: 'some title' }
const createWrapper = () => {
  const mountOptions = {
    store: mockStore,
    localVue,
    propsData
  }
  wrapper = shallow(FileList, mountOptions)
}

describe('FileList', () => {

  beforeEach( () => {
    mockStore = createMockStore()
    createWrapper()
  });

  context('static', () => {
    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })
  
    it('renders the title', () => {
      expect(wrapper.find('.title').text().trim()).to.equal(propsData.title)
    })
  
    it('renders the file list', () => {
      expect(wrapper.findAll('li').length).to.equal(2)
    })
  
    it('renders the list limiter', () => {
      expect(wrapper.find('div.limiter')).to.be.ok
    })
  })

  context('number of files displayed', () => {

    beforeEach( () => {
      mockStore = createMockStore('somepage', {numVisible: 1})
      createWrapper()
    });
  
    it('renders only as many files as are visible', () => {
      expect(wrapper.findAll('li').length).to.equal(1)
    })
  })

  describe('selecting a file', () => {

    it('calls selectFile method', () => {
      const selectFileSpy = sinon.stub(FileList.methods, 'selectFile')
      createWrapper()
      wrapper.findAll('li').at(1).trigger('click')
      expect(selectFileSpy).to.be.calledWith(1)
      selectFileSpy.restore()
    })

    it('calls store commit method', () => {
      mockStore = createMockStore()
      const storeCommitSpy = sinon.stub(mockStore, 'commit')
      createWrapper()
      wrapper.findAll('li').at(1).trigger('click')
      expect(storeCommitSpy).to.be.calledWith('pages/UPDATE_SELECTED', { index: 1, page: "somepage" })
      storeCommitSpy.restore()
    })
  })

})
