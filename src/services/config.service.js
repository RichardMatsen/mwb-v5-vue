import Vue from 'vue'
import { store } from '../store/store'

export default {
  checkConfig() {
    return store.dispatch('waitForFetch', {
      resource: 'config',
      fetch: this.getConfig
    })
  },
  getConfig() {
    return Vue.http.get('migration-workbench.config.json')
      .then((response) => {
        const config = response.body
        setNumToInitialize(config)
        setNumToDisplay(config)
        store.commit('SET_CONFIG', config)
      })
  }
}

const setNumToInitialize = (config) => {
  config.validationsConfig.numToInitialize = config.validationsConfig.numDataPointsForSparkline;
  config.clinicsConfig.numToInitialize = config.clinicsConfig.numDataPointsForSparkline;
  config.referentialsConfig.numToInitialize =
    config.referentialsConfig.daysToInitialize * config.referentialsConfig.filePrefixes.length
}

const setNumToDisplay = (config) => {
  config.referentialsConfig.numInitialFilesToDisplay =
    config.referentialsConfig.daysToDisplay * config.referentialsConfig.filePrefixes.length;
  ['validations', 'referentials', 'clinics'].forEach(fileType => {
    store.commit('pages/UPDATE_NUMVISIBLE', {
      page: fileType,
      tag: fileType,
      numVisible: config[fileType + 'Config'].numInitialFilesToDisplay
    })
  })
}
