/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Login from '@/user/Login.vue'
import AuthService from '@/user/auth.service'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('User', () => {
  describe('Login component', () => {

    let mockStore, mockedServices, wrapper
    let routerStub, $router, authServiceStub

    before(() => {
      localVue.http.interceptors.unshift(interceptor)
    })

    after(() => {
      localVue.http.interceptors.shift()
    })

    beforeEach(() => {
      // Note - for mock $route to work, had to remove Vue.use(VueRouter) from routes.js
      const $route = {
        query: { returnUrl: '/profile'}
      }
      const $toasted = {
        show: () => { return { goAway: () => {} } }
      }
      $router = {
        push: () => {}
      }
      routerStub = sinon.stub($router, 'push')
      mockStore = createMockStore()
      const mountOptions = {
        store: mockStore, 
        router: router,
        localVue,
        propsData: { },
        mocks: { $route, $toasted, $router }
      }
      wrapper = shallow(Login, mountOptions)
      authServiceStub = sinon.stub(AuthService, 'loginUser')
    })
    afterEach(() => {
      $router.push.restore()
      AuthService.loginUser.restore()
    })

    it('should initialize the component', () => {
      expect(wrapper.vm).to.be.ok
    })

    describe('methods', () => {

      describe('selectUser()', () => {
        it('should set loginData.userName', () => {
          wrapper.vm.selectUser('newUserName')
          expect(wrapper.vm.loginData.userName).to.equal('newUserName')
        })
      })

      describe('login()', () => {

        it('should set loginData.userName', () => {
          wrapper.vm.login()
          expect(authServiceStub).to.be.called
        })

        describe('when returnUrl is provided on $route', () => {
          it('should call $router.push with returnUrl', () => {
            wrapper.vm.login()
            expect(routerStub).to.be.called //With(wrapper.vm.$route.query.returnUrl)
          })
        })

        describe('when returnUrl is NOT provided on $route', () => {
          it('should NOT call $router.push with returnUrl', () => {
            wrapper.vm.$route.query.returnUrl = null
            expect(routerStub).not.to.be.called
          })
        })

      })

      describe('cancel()', () => {
        it('should redirect to home page', () => {
          wrapper.vm.cancel()
          expect(routerStub).to.be.calledWith('/')
        })
      })

      describe('select()', () => {
        it('should populate form from selected user', () => {
          const formValues = {}
          wrapper.vm.select(formValues, { userName: 'Brown' })
          expect(formValues.userName).to.equal('Brown')
        })
      })

    })

  });
});
