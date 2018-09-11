/* eslint-disable no-undef */
import Vue from 'vue'
import {
  mount,
  shallow,
  createLocalVue,
  cloneDeep
} from '@vue/test-utils'

import SearchService from '@/search/search.service'
import {
  store
} from '@/store/store'

let storeCommitSpy, gettersStub;

describe('SearchService', () => {

  beforeEach(() => {
    storeCommitSpy = sinon.spy(store, 'commit')
    gettersStub = sinon.stub(store, 'getters')
  })

  afterEach(() => {
    store.commit.restore()
    gettersStub.restore()
  })

  context('getResults', () => {

    it('should call store.commit SET_SEARCHTERM with search term', () => {
      SearchService.getResults('search for this', 'pageType')
      expect(storeCommitSpy).to.be.calledWith('SET_SEARCHTERM', 'search for this')
    })

    context('when search succeeds', () => {
      it('should call store.commit SET_RESULTS with file and count', () => {
        const file1 = {
          content: 'search for this'
        }
        const file2 = {
          content: 'search for this, search for this'
        }
        gettersStub.value({
          'pages/visibleFiles': (page) => [file1, file2]
        })
        SearchService.getResults('search for this', 'pageType')
        const results = storeCommitSpy.getCall(1).args[1]
        expect(storeCommitSpy.getCall(1).args[0]).to.equal('SET_RESULTS')
        expect(results.length).to.equal(2)
        expect(results[0].file).to.equal(file1)
        expect(results[0].count).to.equal(1)
        expect(results[1].file).to.equal(file2)
        expect(results[1].count).to.equal(2)
      })
    })

    context('when search fails', () => {
      it('should call store.commit SET_RESULTS with empty array', () => {
        const file1 = {
          content: 'searchterm is not here'
        }
        const file2 = {
          content: 'searchterm is not here'
        }
        gettersStub.value({
          'pages/visibleFiles': (page) => [file1, file2]
        })
        SearchService.getResults('search for this', 'pageType')
        const results = storeCommitSpy.getCall(1).args[1]
        expect(storeCommitSpy.getCall(1).args[0]).to.equal('SET_RESULTS')
        expect(results.length).to.equal(0)
      })
    })
  })

  context('clearResults', () => {

    it('should call store.commit SET_SEARCHTERM with empty string', () => {
      SearchService.clearResults('pageType')
      expect(storeCommitSpy).to.be.calledWith('SET_SEARCHTERM', '')
    })

    it('should call store.commit SET_RESULTS with empty array', () => {
      SearchService.clearResults('pageType')
      const results = storeCommitSpy.getCall(1).args[1]
      expect(storeCommitSpy.getCall(1).args[0]).to.equal('SET_RESULTS')
      expect(results.length).to.equal(0)
    })
  })

})
