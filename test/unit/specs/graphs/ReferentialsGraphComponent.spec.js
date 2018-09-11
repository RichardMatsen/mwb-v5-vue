/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import {
  mount,
  shallow,
  createLocalVue,
  cloneDeep
} from '@vue/test-utils'

import ReferentialsGraphComponent from '@/graphs/referentials-graph/ReferentialsGraphComponent.vue'
import DataService from '@/graphs/referentials-graph/services/referentials-graph.data.service'
import DrawService from '@/graphs/referentials-graph/services/referentials-graph.draw.service'

import {
  interceptor
} from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

const trimWhiteSpace = (s) => {
  let flat = s
    .replace(/(?:\r\n|\r|\n)/g, ' ')
    .trim()
  while (flat.indexOf('  ') > -1) {
    flat = flat.replace('  ', ' ')
  }
  return flat
}

let mountOptions, wrapper
const dataServiceStub = sinon.spy(DataService, 'loadData')
const drawServiceStub = sinon.spy(DrawService, 'draw')

describe('Graphs', () => {
  describe('ReferentialsGraphComponent', () => {

    before(() => {
      localVue.http.interceptors.unshift(interceptor)
    })
    after(() => {
      localVue.http.interceptors.shift()
    })

    beforeEach(() => {
      mountOptions = {
        localVue
      }
      wrapper = shallow(ReferentialsGraphComponent, mountOptions)
    })

    it('should create the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    describe('methods', () => {

      describe('initialize()', () => {
        it('should call DataService loadData', () => {
          wrapper.vm.initialize()
          expect(dataServiceStub).to.be.called
        })
      })
      describe('diagonal(source, target)', () => {
        it('should creates a curved (diagonal) path from source to target nodes', () => {
          const result = wrapper.vm.diagonal({
            x: 1,
            y: 100
          }, {
            x: 1,
            y: 100
          })
          const expected = `M 100 1 C 100 1, 100 1, 100 1`
          expect(trimWhiteSpace(result)).to.equal(expected)
        })
      })
    })
  });
});
