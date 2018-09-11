/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {
  mount,
  shallow,
  createLocalVue,
  cloneDeep
} from '@vue/test-utils'

import Profile from '@/user/Profile.vue'
import {
  store
} from '@/store/store'
import router from '@/router/routes'
import {
  interceptor
} from '@/testing-utils/test-interceptor'
import {
  createMockStore
} from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(VueResource)

let currentUser = {
  userName: 'Smith'
}

let mockStore, mockedServices, mountOptions, wrapper
let routerStub, stateStub, storeCommitStub

describe('User', () => {
  describe('Profile component', () => {

    before(() => {
      localVue.http.interceptors.unshift(interceptor)
    })
    after(() => {
      localVue.http.interceptors.shift()
    })

    const setup = () => {
      routerStub = sinon.stub(router, 'push')
      stateStub = sinon.stub(store, 'state')
      mockStore = createMockStore('somePage', {
        currentUser
      })
      mountOptions = {
        store: mockStore,
        router: router,
        localVue,
        propsData: {}
      }
      storeCommitStub = sinon.stub(mockStore, 'commit')
      wrapper = shallow(Profile, mountOptions)
    }
    const teardown = () => {
      router.push.restore()
      stateStub.restore()
      if (mockStore.commit.restore) {
        mockStore.commit.restore()
      }
    }

    beforeEach(() => {
      setup()
    });
    afterEach(() => {
      teardown()
    })

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    describe('methods', () => {

      describe('saveProfile()', () => {
        it('should save the current user to store', () => {
          wrapper.vm.saveProfile()
          expect(storeCommitStub).to.be.calledWith('UPDATE_USER', currentUser)
        })
      })
      describe('cancel()', () => {
        it('should redirect to home page', () => {
          wrapper.vm.cancel()
          expect(routerStub).to.be.calledWith('/dashboard')
        })
      })
      describe('logout()', () => {
        it('should set store currentUser to null', () => {
          wrapper.vm.logout()
          expect(mockStore.state.user.currentUser).to.equal(null)
        })
        it('should redirect to home page', () => {
          wrapper.vm.logout()
          expect(routerStub).to.be.calledWith('/dashboard')
        })
      })
    })

    describe('redirect to Login', () => {

      describe('when user is logged in', () => {
        it('should NOT redirect to Login page', () => {
          expect(routerStub).not.to.be.called //With('/login?returnUrl=/profile')
        })
      })

      describe('when user is NOT logged in', () => {

        beforeEach(() => {
          teardown() // unwrap stubs
          currentUser = null // change store element
          setup() // rebuild fixture
        });

        it('should redirect to Login page', () => {
          expect(routerStub).to.be.calledWith('/login?returnUrl=/profile')
        })

      })
    })
  });
});
