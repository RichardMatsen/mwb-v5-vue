import Vue from 'vue'

const state = {
  measures: [],
}

export const mutations = {
  'SET_MEASURES' (state, payload) {
    state.measures = payload
  },
  'UPDATE_MEASURE' (state, payload) {
    let measureIndex = state.measures.findIndex(measure => measure.id === payload.measure.id)
    if (measureIndex > -1) {
      // Vue.set to ensure new array items are observable
      Vue.set(state.measures, measureIndex, {...state.measures[measureIndex], ...payload.measure}); 
      Vue.set(state.measures[measureIndex], 'status', 'updated');
    }
  },
}

export default {
  state,
  mutations
}
