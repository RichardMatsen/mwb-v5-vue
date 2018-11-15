import { store } from '@/store/store'
import Mark from 'mark.js'

const getResults = (searchTerm, pageType) => {
  store.commit('SET_SEARCHTERM', searchTerm)
  const visibleFiles = store.getters['pages/visibleFiles'](pageType)

  const results = visibleFiles
    .filter(file => searchFile(file, searchTerm))
    .map(file => {
      return {
        file,
        count: file.search.count
      }
    })

  if (results && results.length) {
    store.commit('SET_RESULTS', results)
  } else {
    store.commit('SET_RESULTS', [])
  }
}

const clearResults = (pageType) => {
  const files = store.state.search.results.map(result => result.file)
  files.forEach(file => {
    file.search = null
  })
  store.commit('SET_SEARCHTERM', '')
  store.commit('SET_RESULTS', [])
  store.commit('SET_MATCHCOUNT', 0)
}

const searchFile = (file, searchTerm) => {
  if (!file || !file.content) {
    return false;
  }
  const count = getMatches(file, searchTerm)
  file.search = {
    markedTerm: searchTerm,
    count
  }
  return count > 0
}

const getMatches = (file, searchTerm) => {
  let count = 0
  const div = document.createElement('div')
  div.innerHTML = file.content
  const instance = new Mark(div);
  instance.mark(searchTerm, {
    separateWordSearch: false,
    done: (matchCount) => count = matchCount
  })
  return count
}

export default {
  getResults,
  clearResults,
  searchFile
}
