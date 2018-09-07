
const state = {
  docsPanelIsOpen: false
}

export const mutations = {
  'TOGGLE_DOCS_PANEL' (state) {
    state.docsPanelIsOpen = !state.docsPanelIsOpen 
  }
}

export default {
  state,
  mutations
}
