/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import DataService from '@/services/data.service'
import FileService from '@/services/file.service'
import { store } from '@/store/store'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

let storeDispatchSpy, storeCommitSpy, stateStub;

describe('DataService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  beforeEach(() => {
    storeDispatchSpy = sinon.spy(store, 'dispatch')
    storeCommitSpy = sinon.stub(store, 'commit')
    stateStub = sinon.stub(store, 'state')
  })
  
  afterEach(() => {
    store.dispatch.restore()
    store.commit.restore()
    stateStub.restore()
  })
  
  describe('checkAllFiles', () => {
    it('should call checkFiles for all pages', () => {
      const checkFilesStub = sinon.stub(DataService, 'checkFiles')
      DataService.checkAllFiles();
      expect(checkFilesStub).to.be.calledWith('validations')
      expect(checkFilesStub).to.be.calledWith('referentials')
      expect(checkFilesStub).to.be.calledWith('clinics')
      DataService.checkFiles.restore()
    })
  })

  describe('checkFiles', () => {

    context('when files are not in store', () => {

      beforeEach(() => {
        stateStub.value({
          config: {
            clinicsConfig: {
              filePrefixes: ['Clinics'],
              numToInitialize: 2
            }
          },
          pages: {
            files: {
              clinics: []
            }
          },
          loadStatus: {}
        })
      })

      it('should call store.dispatch(waitForFetch) ', async() => {
        DataService.checkFiles('clinics');
        await flushPromises()
        expect(storeDispatchSpy).to.be.called
        expect(storeDispatchSpy.getCall(0).args[0]).to.equal('waitForFetch')
      })

      it('should pass load options', async() => {
        DataService.checkFiles('clinics');
        await flushPromises()
        const loadOptions = storeDispatchSpy.getCall(0).args[1]
        expect(loadOptions.resource).to.equal('files/clinics')
      })

      describe('getFiles', () => {
        it('should call store pages/SET_FILES', async() => {
          DataService.getFiles('clinics');
          await flushPromises()
          expect(storeCommitSpy.getCall(0).args[0]).to.equal('pages/SET_FILES')
          expect(storeCommitSpy.getCall(0).args[1].files.length).to.equal(3)
        })  
      })
    })

    context('when files are in store', () => {

      it('should NOT call store.dispatch(waitForFetch)', () => {
        stateStub.value({
          pages: {
            files: {
              'clinics': [{}, {}]
            }
          }
        })
        DataService.checkFiles('clinics');
        expect(storeDispatchSpy).not.to.be.called
      })
    })

  })

  describe('updateContent', () => {
    
    let fileServiceStub;

    beforeEach(() => {
      fileServiceStub = sinon.stub(FileService, 'getFile')
    })
    
    afterEach(() => {
      FileService.getFile.restore()
    })
    
    beforeEach(() => {
      stateStub.value({
        pages: {
          files: {
            'clinics': [
              { name: 'file1', content: 'content1' },
              { name: 'file2', content: 'content2' },
              { name: 'file3', content: null }
            ]
          }
        }
      })
    })

    beforeEach(() => {
      const response = {body: 'content added'}
      fileServiceStub.returns(Promise.resolve(response))
    })

    it('should update the content field of files without content', async() => {
      DataService.updateContent('clinics', 3)
      await flushPromises()
      expect(fileServiceStub).to.be.calledWith('file3')
    })

    it('should not update files which already have content', async() => {
      DataService.updateContent('clinics', 3)
      await flushPromises()
      expect(fileServiceStub.getCalls().length).to.equal(1)
    })

  })
})
