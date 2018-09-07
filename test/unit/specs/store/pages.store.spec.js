/* eslint-disable no-undef */
import flushPromises from 'flush-promises'

import DataService from '@/services/data.service'
import { getters, mutations, actions } from '@/store/modules/pages.store'

describe('store', () => {

  describe('pages.store', () => {

    describe('getters', () => {
    
      it('visibleFiles', () => {
        const page = 'somePage'
        const state = {
          numVisible: { somePage: 1 },
          files: { somePage: [ {name: 'file1'}, {name: 'file2'}] }
        }
        const result = getters.visibleFiles(state)(page)
        expect(result).to.deep.equal([{name: 'file1'}])
      })
    
      it('fileInfo', () => {
        const page = 'somePage'
        const state = {
          selected: { somePage: 1 },
          files: { somePage: [ {name: 'file1'}, {name: 'file2'}] }
        }
        const result = getters.fileInfo(state)(page)
        expect(result.name).to.equal('file2')
      })
    })

    describe('mutations', () => {

      it('SET_FILES', () => {
        const state = { files: {} }
        const payload = { 
          page: 'somePage',
          files: [{},{}]
        }
        mutations.SET_FILES(state, payload)
        expect(state.files[payload.page]).to.deep.equal(payload.files)
      })

      it('UPDATE_NUMVISIBLE', () => {
        const state = { numVisible: {} }
        const payload = { 
          page: 'somePage',
          numvisible: 5
        }
        mutations.UPDATE_NUMVISIBLE(state, payload)
        expect(state.numVisible[payload.page]).to.equal(payload.numVisible)
      })

      it('UPDATE_SELECTED', () => {
        const state = { selected: {} }
        const payload = { 
          page: 'somePage',
          index: 6
        }
        mutations.UPDATE_SELECTED(state, payload)
        expect(state.selected[payload.page]).to.equal(payload.index)
      })

    })

    describe('actions', () => {

      let context, payload, result
      beforeEach(() => {
        context = { commit: () => {}, state: {} }  // same properties as store
        payload = {
          page: 'somePage',
          numVisible: 1
       }
      })

      let dataServiceStub, commitStub 
      beforeEach(() => {
        dataServiceStub = sinon.stub(DataService, 'updateContent')
        dataServiceStub.returns(Promise.resolve('resolved'))
        commitStub = sinon.stub(context, 'commit')
      })
      afterEach(() => {
        DataService.updateContent.restore()
        context.commit.restore()
      })

      describe('updateNumVisible', () => {

        it('should call DataService.updateContent', () => {
          result = actions.updateNumVisible(context, payload)
          expect(dataServiceStub).to.be.calledWith(payload.page, payload.numVisible)
        })

        it('should call store commit', async() => {
          result = actions.updateNumVisible(context, payload)
          await flushPromises
          expect(commitStub).to.be.calledWith('UPDATE_NUMVISIBLE', payload)
        })

      })

    })

  })
});
