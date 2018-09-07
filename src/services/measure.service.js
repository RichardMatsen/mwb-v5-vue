import Vue from 'vue'
import { store } from '../store/store'
import HistoryService from './history.service'
import DataMetricService from '@/services/data-metric.service'

export default {
  checkMeasures () {
    return store.dispatch('waitForFetch', {
      resource: 'measures',
      fetch: this.getMeasures
    })
  },
  getMeasures () {
    return Vue.http.get('InitialMeasures.json')
    .then(response => {
      return response.json()
    })
    .catch(err => console.error('getMeasures() failed response', err) )
    .then((data) => {
      data.measures.forEach(measure => {
        measure.history = measure.history || []  // Ensure property for reactive update
      })
      store.commit('SET_MEASURES', data.measures)
    })
    .catch(err => console.error('getMeasures() failed data', err) )
  },
  updateMeasures () {
    const measures = store.state.measures.measures
    const files = store.state.pages.files
    updateValidationsMeasure(measures, files);
    updateReferentialsMeasure(measures, files);
    updateClinicsMeasure(measures, files);
  }
}

const updateValidationsMeasure = (measures, files) => {
  if (!files.validations || !files.validations.length) return
  const first =  files.validations[0]
  const badgeColor = DataMetricService.getBadgeColor('validations', first.metric)
  const payload = {
    measure: {
      id: 'validations',
      metric: first.metric,
      color: badgeColor,  
      history: HistoryService.validationsHistory(files.validations)
    },
    tag: 'validations'
  }
  store.commit('UPDATE_MEASURE', payload)
}

const updateReferentialsMeasure = (measures, files) => {
  if (!files.referentials || !files.referentials.length) return
  const history = HistoryService.referentialsHistory(files.referentials);
  const metric = history[history.length - 1];
  const badgeColor = DataMetricService.getBadgeColor('referentials', metric)
  const payload = {
    measure: {
      id: 'referentials',
      metric: metric,
      color: badgeColor,
      history: history,
    },
    tag: 'referentials'
  }
  store.commit('UPDATE_MEASURE', payload)
}

const updateClinicsMeasure = (measures, files) => {
  if (!files.clinics || !files.clinics.length) return
  const first = files.clinics[0]
  const badgeColor = DataMetricService.getBadgeColor('clinics', first.metric)
  const payload = {
    measure: {
      id: 'clinics',
      metric: first.metric,
      color: badgeColor,
      history: HistoryService.clinicsHistory(files.clinics)
    },
    tag: 'clinics',
  }
  store.commit('UPDATE_MEASURE', payload)
}
