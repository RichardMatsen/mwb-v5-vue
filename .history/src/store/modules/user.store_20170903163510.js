
const state = {
  users: [],
  currentUser: null
}

const mutations = {
  'SET_USERS' (state, payload) {
    state.users = payload.users
  },
  'SET_CURRENT_USER' (state, payload) {
    state.currentUser = payload
  },
  'UPDATE_USER' (state, payload) {
    const user = state.users.find(user => user.lastName === payload.lastName)
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
