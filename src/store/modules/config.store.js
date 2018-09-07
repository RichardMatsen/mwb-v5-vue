
const state = {
  baseDataUrl: '',
  clinicsConfig: {
    filePrefixes: [],
    numDataPointsForSparkline: 10,
    numInitialFilesToDisplay: 3,   
    page: {
      pageTitle: '',
      pageDescription: '',
      listTitle: '',
      listWidth: 0,
      badgeUnits: '',
      resultsZoom: ''
    }
  },
  validationsConfig: {
    filePrefixes: [],
    numDataPointsForSparkline: 10,
    numInitialFilesToDisplay: 3,   
    page: {
      pageTitle: '',
      pageDescription: '',
      listTitle: '',
      listWidth: 0,
      badgeUnits: '',
      resultsZoom: ''
    }
  },
  referentialsConfig: {
    filePrefixes: [],
    daysToInitialize: 0,   
    daysToDisplay: 0,
    page: {
      pageTitle: '',
      pageDescription: '',
      listTitle: '',
      listWidth: 0,
      badgeUnits: '',
      resultsZoom: ''
    }
  },
}

export const mutations = {
  'SET_CONFIG' (state, payload) {
    state.baseDataUrl = payload.baseDataUrl
    state.clinicsConfig = payload.clinicsConfig
    state.referentialsConfig = payload.referentialsConfig
    state.validationsConfig = payload.validationsConfig
  }
}

export default {
  state,
  mutations
}
