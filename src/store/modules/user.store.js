
const state = {
  users: [],
  currentUser: null
}

export const mutations = {
  'SET_USERS' (state, payload) {
    state.users = payload.users
  },
  'SET_CURRENT_USER' (state, payload) {
    state.currentUser = payload
  },
  'UPDATE_USER' (state, payload) {
    const user = state.users.find(user => user.id === payload.id)
    if (user) {
      user.firstName = payload.firstName
      user.lastName = payload.lastName
      user.password = payload.password
    }
  }
}

export default {
  state,
  mutations
}
