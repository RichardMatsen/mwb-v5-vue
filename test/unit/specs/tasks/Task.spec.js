/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Task from '@/tasks/Task.vue'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Tasks', () => {
  describe('Task component', () => {

    let mockStore, mockedServices, wrapper

    before(() => {
      localVue.http.interceptors.unshift(interceptor)
    })

    after(() => {
      localVue.http.interceptors.shift()
    })

    beforeEach( () => {
      mockStore = createMockStore()
    });
    afterEach(() => {
    })

    beforeEach( () => {
      const mountOptions = {
        store: mockStore, 
        router: router,
        localVue,
        propsData: { 
          task: {
            id: 1,
            status: 'Unassigned',
            type: 'validations',
            effectiveDate: '2017-06-07',
          }
        }
      }
      wrapper = shallow(Task, mountOptions)
    });

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

  });
});
