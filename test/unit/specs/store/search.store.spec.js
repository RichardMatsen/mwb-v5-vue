/* eslint-disable no-undef */
import { getters, mutations } from '@/store/modules/search.store'

describe('store', () => {

  describe('search.store', () => {

    describe('getters', () => {

      let state
      beforeEach(() => {
        state = {
          searchTerm: '',
          results: [
            { file: {name: 'file1'}, count: 6 },
            { file: {name: 'file2'}, count: 10 }
          ]
        }
      })
  
      describe('searchResultForFile', () => {
        
        describe('when file is in search results', () => {
          it('should return result', () => {
            const fileName = 'file2'
            const result = getters.searchResultForFile(state)(fileName)
            expect(result.file).to.deep.equal({name: 'file2'})
            expect(result.count).to.equal(10)
          })
        })

        describe('when file is NOT in search results', () => {
          it('should return undefined', () => {
            const fileName = 'files3'
            const result = getters.searchResultForFile(state)(fileName)
            expect(result).to.equal(undefined)
          })
        })

      })
      
      describe('searchResutsCountForFile', () => {
        
        describe('when file is in search results', () => {
          it('should return count of times searchTerm occurs in file', () => {
            const fileName = 'file2'
            const result = getters.searchResutsCountForFile(state)(fileName)
            expect(result).to.equal(10)
          })
        })

        describe('when file is NOT in search results', () => {
          it('should return undefined', () => {
            const fileName = 'files3'
            const result = getters.searchResutsCountForFile(state)(fileName)
            expect(result).to.equal(0)
          })
        })

      })
      
    })

    describe('mutations', () => {

      let state
      beforeEach(() => {
        state = {
          searchTerm: '',
          results: []
        }
      })
  
      it('SET_RESULTS', () => {
        const payload = [{}, {}]
        mutations.SET_RESULTS(state, payload)
        expect(state.results).to.deep.equal(payload)
      })

      it('SET_SEARCHTERM', () => {
        const payload = 'aSearchTerm'
        mutations.SET_SEARCHTERM(state, payload)
        expect(state.searchTerm).to.deep.equal(payload)
      })
      
    })

  })
})
    