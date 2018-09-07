/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import flushPromises from 'flush-promises'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import ConfigService from '@/services/config.service'
import { store } from '@/store/store'
import { interceptor } from '@/testing-utils/test-interceptor'

let storeDispatchSpy, storeCommitSpy, stateStub;

const localVue = createLocalVue()
localVue.use(VueResource)

describe('ConfigService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  beforeEach(() => {
    storeDispatchSpy = sinon.spy(store, 'dispatch')
    storeCommitSpy = sinon.spy(store, 'commit')
    stateStub = sinon.stub(store, 'state')
  })
  
  afterEach(() => {
    store.dispatch.restore()
    store.commit.restore()
    stateStub.restore()
  })

  describe('checkConfig', () => {
    it('should call store dispatch', () => {
      ConfigService.checkConfig()
      expect(storeDispatchSpy).to.be.called
    })
  })
  
  describe('getConfig', () => {
    it('should call store commit', async() => {
      ConfigService.getConfig()
      await flushPromises()
      expect(storeCommitSpy).to.be.called
    })
  })
  
})
