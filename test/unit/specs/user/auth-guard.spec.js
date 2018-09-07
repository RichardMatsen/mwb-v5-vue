/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import AuthGuard from '@/user/auth-guard'
import { store } from '@/store/store'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

let storeDispatchSpy, storeCommitSpy, stateStub;

describe('User', () => {
  describe('AuthGuard', () => {

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
    
    describe('canActivate', () => {

      describe('when a user is logged in', () => {

        beforeEach(() => {
          stateStub.value({
            user: {
              users: [{ userName: 'Smith' }, { userName: 'Jones' }],
              currentUser: { userName: 'Smith' }
            }
          })
        })

        it('should return true', () => {
          const result = AuthGuard.canActivate();
          expect(result).to.equal(true)
        })
      })

      describe('when a user is NOT logged in', () => {

        beforeEach(() => {
          stateStub.value({
            user: {
              users: [{ userName: 'Smith' }, { userName: 'Jones' }],
              currentUser: null
            }
          })
        })

        it('should return false', () => {
          const result = AuthGuard.canActivate();
          expect(result).to.equal(false)
        })

        it('should redirect to "/login"', () => {
          const routerStub = sinon.stub(router, 'push')
          const result = AuthGuard.canActivate();
          expect(routerStub).to.be.calledWith('/login')
          router.push.restore()
        })
      })

    })

  })
})
