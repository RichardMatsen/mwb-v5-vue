/* eslint-disable no-undef */
import { mutations } from '@/store/modules/user.store'

describe('store', () => {

  describe('user.store', () => {

    describe('mutations', () => {

      let state
      beforeEach(() => {
        state = {
          users: [],
          currentUser: null
        }
      })
  
      it('SET_USERS', () => {
        const payload = { users: [{}, {}] }
        mutations.SET_USERS(state, payload)
        expect(state.users).to.deep.equal(payload.users)
      })

      it('SET_CURRENT_USER', () => {
        const payload = { name: 'fred' }
        mutations.SET_CURRENT_USER(state, payload)
        expect(state.currentUser).to.deep.equal(payload)
      })

      describe('UPDATE_USER', () => {

        beforeEach(() => {
          state.users = [
            { firstName: 'John', lastName: 'Johnson', password: 'abc' },
            { firstName: 'Fred', lastName: 'Fellows', password: 'def' }
          ]
        })

        describe('when user is in users list', () => {
          it('should change the user entry', () => {
            const payload = { firstName: 'Franz', lastName: 'Fellows', password: 'xyz' }
            mutations.UPDATE_USER(state, payload)
            expect(state.users[1]).to.deep.equal(payload)
          })
        })

        describe('when user is NOT in users list', () => {
          it('should NOT change any user', () => {
            const payload = { firstName: 'George', lastName: 'Grimes', password: 'xyz' }
            mutations.UPDATE_USER(state, payload)
            expect(state.users.map(u => u.lastName)).to.deep.equal(['Johnson', 'Fellows'])
          })
        })

      })

    })

  })
})
    