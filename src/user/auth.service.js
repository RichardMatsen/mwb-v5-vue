import Vue from 'vue'
import { store } from '@/store/store'

export default {
  checkUsers () {
    return store.dispatch('waitForFetch', {
      resource: 'users',
      fetch: this.getUsers
    })
  },
  getUsers () {
    return Vue.http.get('users.json')
      .then((response) => {
        store.commit('SET_USERS', response.body)
      })
  },
  loginUser (name, password) {
    const userIndex = store.state.user.users.map(user => user.userName).indexOf(name);
    if (userIndex > -1) {
      store.commit('SET_CURRENT_USER', store.state.user.users[userIndex]);
    }
  }
}
