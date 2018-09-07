
const state = {
  searchTerm: '',
  matchCount: 0,
  results: []
}

export const mutations = {
  'SET_RESULTS' (state, payload) {
    state.results = payload
  },
  'SET_SEARCHTERM' (state, payload) {
    state.searchTerm = payload
  },
  'SET_MATCHCOUNT' (state, payload) {
    state.matchCount = payload
  }
}

export const getters = {
  searchResultForFile: state => {
    return fileName => {
      return state.results.find(r => r.file.name === fileName)
    }
  },
  searchResultsCountForFile: state => {
    return fileName => {
      const resultsForFile = state.results.find(r => r.file.name === fileName)
      return resultsForFile ? resultsForFile.count : 0
    }
  }
}

export default {
  state,
  mutations,
  getters,
}
