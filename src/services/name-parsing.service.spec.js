/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import NameParsingService from '@/services/name-parsing.service'
import { store } from '@/store/store'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

let storeDispatchStub, storeCommitStub, stateStub

describe('NameParsingService', () => {

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  beforeEach(() => {
    storeDispatchStub = sinon.stub(store, 'dispatch')
    storeCommitStub = sinon.stub(store, 'commit')
    stateStub = sinon.stub(store, 'state')
  })

  afterEach(() => {
    store.dispatch.restore()
    store.commit.restore()
    stateStub.restore()
  })

  context('parseFiles', () => {
    it('should convert file string to parsed fileInfo object', () => {
      const filelist = [
        'Clinics DB3 (01 Jun 2016 - 10.00).html',
        'Clinics DB3 (03 Jun 2016 - 11.00).html',
        'Clinics DB3 (26 May 2016 - 12.00).html',
      ] 
      const parsed = NameParsingService.parseFiles(filelist, ['Clinics'])
      expect(parsed.length).to.equal(3)
      const expected = {
        name: 'Clinics DB3 (01 Jun 2016 - 10.00)', 
        namePrefix: 'Clinics', 
        baseName: 'Clinics DB3', 
        displayName: 'Clinics DB3 (01 Jun 2016 - 10.00)', 
        effectiveDate: new Date(2016, 5, 1),
        effectiveTime: '10:00', 
      }
      Object.keys(expected).forEach(key => {
        expect(parsed[0][key]).to.deep.equal(expected[key])
      })
    })
  })
});
