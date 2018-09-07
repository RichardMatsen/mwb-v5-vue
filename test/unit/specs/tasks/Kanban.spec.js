/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Kanban from '@/tasks/Kanban.vue'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Tasks', () => {
  describe('Kanban component', () => {

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
            stages: ['Unassigned', 'In Progress', 'Waiting', 'Done'],
            blocks: [
              {
                id: 1,
                status: 'Unassigned',
                type: 'validations',
                effectiveDate: '2017-06-07',
              },
              {
                id: 2,
                status: 'In Progress',
                type: 'validations',
                icon: 'fa-check-square-o',
                effectiveDate: '2017-06-06',
                assignedTo: 'Sam'
              },
            ],
          },
        }
      wrapper = shallow(Kanban, mountOptions)
    });

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

  });
});
