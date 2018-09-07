/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import FileService from '@/services/file.service'
import { interceptor, setFail, resetFail } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

describe('FileService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  describe('getFileList', ()  => {

    it('should fetch fileList', async() => {
      const promise = FileService.getFileList()
      await flushPromises
      return promise.then(fileList => {  // return statement ensures 'then' is evaluated
        expect(fileList.length).to.equal(7)
      })
    })

    it('should fail if filelist not found', async() => {
      setFail()
      const consoleStub = sinon.stub(console, 'error')
      const promise = FileService.getFileList()
      await flushPromises
      return promise.then(fileList => {  // return statement ensures 'then' is evaluated
        expect(fileList).to.equal(undefined)
        expect(consoleStub).to.be.called
      }).finally(() => { 
        resetFail()
        console.error.restore()
      })
    })
  })

  describe('getFile', ()  => {

    it('should fetch file', async() => {
      const promise = FileService.getFile('Clinics DB3 (01 Jun 2016 - 11.00)')
      await flushPromises
      return promise.then(response => {  // return statement ensures 'then' is evaluated
        expect(response.body).to.equal('some Clinics content')
      })
    })

    it('should fail if file not found', async() => {
      setFail()
      const consoleStub = sinon.stub(console, 'error')
      const promise = FileService.getFile('Clinics DB3 (01 Jun 2016 - 11.00)')
      await flushPromises
      return promise.then(response => {  // return statement ensures 'then' is evaluated
        expect(response).to.equal(undefined)
        expect(consoleStub).to.be.called
      }).finally(() => { 
        resetFail()
        console.error.restore()
      })
    })
  })

});
