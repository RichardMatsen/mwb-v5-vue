import Vue from 'vue'
import { store } from '../store'

const state = {
}

export const mutations = {
  'ON_FETCHING' (state, payload) {
    state[payload.resource] = payload.status 
  },
  'ON_FETCH' (state, payload) {
    state[payload.resource] = payload.status 
  },
  'ON_FAIL' (state, payload) {
    state[payload.resource] = payload.status 
  }
}

export const actions = {
  waitForFetch: (context, {resource, fetch, fail, timeout}) => {
    return isLoaded(context.state, resource) ? Promise.resolve('already loaded')  // eslint-disable-line no-undef
    : isInitial(context.state, resource) ? doFetch(resource, fetch, fail)
    : isLoading(context.state, resource) ? doWaitForLoading(context.state, resource, timeout)
    : null
  }
}

const doFetch = (resource, fetch, fail) => {
  if (!fetch) { 
    throw new Error(`Error: no fetch method was passed in for resource: ${resource}`)
  }
  store.commit('ON_FETCHING', {resource, status: `loading`})
  var t0 = Date.now(); // performance.now();
  const fetchPromise = fetch()
  fetchPromise
    .then(_ => onFetched(resource, t0))
    .catch(error => onFail(resource, fail, error))
  return fetchPromise
}

const onFetched = (resource, t0) => {
  var t1 = Date.now();
  store.commit('ON_FETCH', {resource, status: `loaded ${Math.round(t1 - t0)} ms`})
}

const onFail = (resource, fail, error) => {
  store.commit('ON_FAIL', {resource, status: `failed - error: ${error.message}`})
  if (fail) {
    fail()
  }
}

const doWaitForLoading = (state, resource, timeout) => {
  timeout = timeout || 3000
  return new Promise(function(resolve, reject) {  // eslint-disable-line no-undef
    setTimeout(function() {
      if (isLoaded(state, resource)) {
        resolve('loaded')  // Inform the waiter of success
      } else {
        reject('failed')  // Inform the waiter of failure
      }
    }, timeout);
  })
}

const isInitial = (state, resource) => {
  return !state[resource] || (state[resource] !== 'loading' && !state[resource].startsWith('loaded'))
}

const isLoaded = (state, resource) => {
  return state[resource] && state[resource].startsWith('loaded')
}

const isLoading = (state, resource) => {
  return state[resource] === 'loading'
}

export default {
  state,
  mutations,
  actions
}
