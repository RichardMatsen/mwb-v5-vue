import DataService from '@/services/data.service'
import FilesByDateService from '@/services/files-by-date.service'

const state = {
  files: {
    validations: [],
    referentials: [],
    clinics: []
  },
  selected: {
    validations: 0,
    referentials: 0,
    clinics: 0
  },
  numVisible: {
    validations: 5,
    referentials: 5,
    clinics: 5
  },
}

export const getters = {
  visibleFiles: state => {
    return page => {
      const numVisible = state.numVisible[page] || 0
      const files = state.files[page]
      return files ? files.slice(0, numVisible) : []
    }
  },
  fileInfo: state => {
    return page => {
      const selected = state.selected[page]
      const files = state.files[page]
      return files[selected]
    }
  }
}

export const mutations = {
  'SET_FILES' (state, payload) {
    state.files[payload.page] = payload.files
  },
  'UPDATE_NUMVISIBLE' (state, payload) {
    state.numVisible[payload.page] = payload.numVisible
  },
  'UPDATE_SELECTED' (state, payload) {
    state.selected[payload.page] = payload.index 
  },
  'SET_FILE' (state, payload) {
    const index = state.files[payload.page].indexOf(fileInfo => fileInfo.name === payload.fileInfo.name)
    if (index > -1) {
      state.files[payload.page] = payload.fileInfo
    }
  },
}

export const actions = {
  updateNumVisible: (context, payload) => {
    DataService.updateContent(payload.page, payload.numVisible)
    .then(_ => {
      context.commit('UPDATE_NUMVISIBLE', payload)
    })
  },
  setFiles: (context, {page, files, daysToDisplay}) => {
    if (page === 'referentials') {
      const numFilesToDisplay = FilesByDateService.getCountFilesForLastNDays(daysToDisplay, files)
      context.commit('UPDATE_NUMVISIBLE', {page, tag: page, numVisible: numFilesToDisplay})
    }
    context.commit('SET_FILES', {page, files})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
