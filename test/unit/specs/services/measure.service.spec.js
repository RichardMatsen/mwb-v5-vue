/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import MeasureService from '@/services/measure.service'
import { store } from '@/store/store'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

let storeDispatchStub, storeCommitStub, stateStub

describe('MeasureService', () => {

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

  describe('checkMeasures', () => {
    it('should call store dispatch', () => {
      MeasureService.checkMeasures()
      expect(storeDispatchStub).to.be.called
    })
  })
  
  describe('getMeasures', () => {
    it('should call store commit', async() => {
      const result = MeasureService.getMeasures()
      await flushPromises
      expect(storeCommitStub).to.be.calledWith('SET_MEASURES', [{
        color: "grey",
        history: [],
        icon: "fa-check-square-o",
        id: "validations",
        link: "validations",
        metric: "0",
        narrative: "Code Validation...",
        title: "Code Validations"
      }])
    })
  })
  
  describe('updateMeasures', () => {

    context('clinics', () => {
      it('should call store commit', async() => {
        stateStub.value({
          measures: { measures: [] },
          pages: {
            files: {
              'clinics': [{ metric: '66%' }, { metric: '55%' }]
            }
          }
        })
        const result = MeasureService.updateMeasures()
        await flushPromises
        expect(storeCommitStub).to.be.calledWith('UPDATE_MEASURE', 
          { measure: { color: "red", history: [1, 12], id: "clinics", metric: "66%" }, tag: 'clinics' }
        )
      })
    })

    context('validations', () => {
      it('should call store commit', async() => {
        stateStub.value({
          measures: { measures: [] },
          pages: {
            files: {
              'validations': [{ metric: 6 }, { metric: 5 }]
            }
          }
        })
        const result = MeasureService.updateMeasures()
        await flushPromises
        expect(storeCommitStub).to.be.calledWith('UPDATE_MEASURE', 
          { measure: { color: "orange", history: [5, 6], id: "validations", metric: 6 }, tag: "validations" }
        )
      })
    })

    context('referentials', () => {
      it('should call store commit', async() => {
        stateStub.value({
          measures: { measures: [] },
          pages: {
            files: {
              'referentials': [{ metric: 32 }, { metric: 16 }]
            }
          }
        })
        const result = MeasureService.updateMeasures()
        await flushPromises
        expect(storeCommitStub).to.be.calledWith('UPDATE_MEASURE', 
          { measure: { color: "red", history: [48], id: "referentials", metric: 48 }, tag: "referentials" }
        )
      })
    })
  })
  
});
