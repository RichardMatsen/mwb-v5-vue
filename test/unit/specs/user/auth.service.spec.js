/* eslint-disable no-undef */
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import AuthService from '@/user/auth.service'
import { store } from '@/store/store'
import { interceptor } from '@/testing-utils/test-interceptor'

const localVue = createLocalVue()
localVue.use(VueResource)

let storeDispatchSpy, storeCommitSpy, stateStub;

describe('User', () => {
  describe('AuthService', () => {

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
    
    describe('checkUsers', () => {

      let options
      beforeEach(() => {
        options = {
          resource: 'users',
          fetch: () => {} 
        };
      })

      beforeEach(async() => {
        AuthService.checkUsers(options);
        await flushPromises()
      })

      it('should call store.dispatch(waitForFetch) ', () => {
        expect(storeDispatchSpy).to.be.called
        expect(storeDispatchSpy.getCall(0).args[0]).to.equal('waitForFetch')
      })

      it('should pass load options', () => {
        const loadOptions = storeDispatchSpy.getCall(0).args[1]
        expect(loadOptions.resource).to.equal('users')
      })
    })

    describe('getUsers', () => {

      it('should call store SET_USERS', async() => {
        AuthService.getUsers()
        await flushPromises()
        expect(storeCommitSpy.getCall(0).args[0]).to.equal('SET_USERS')
        expect(storeCommitSpy.getCall(0).args[1].length).to.equal(2)
      })  

    })

    describe('loginUser', () => {

      it('should call store SET_CURRENT_USER', async() => {
        stateStub.value({
          user: {
            users: [{ userName: 'Smith' }, { userName: 'Jones' }]
          }
        })
        AuthService.loginUser('Jones', 'abc')
        await flushPromises()
        expect(storeCommitSpy.getCall(0).args[0]).to.equal('SET_CURRENT_USER')
        expect(storeCommitSpy.getCall(0).args[1]).to.deep.equal({ userName: 'Jones' })
      })  

    })

  })
})
