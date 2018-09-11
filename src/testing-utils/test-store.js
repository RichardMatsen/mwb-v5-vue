import Vuex from 'vuex'

const files = [{
    displayName: 'item1',
    name: 'item1',
    effectiveTime: '2006-07-07 10:12:14',
    metric: 99,
    badgeColor: 'red'
  },
  {
    displayName: 'item2',
    name: 'item2',
    effectiveTime: '2006-07-07 10:12:14',
    metric: 99,
    badgeColor: 'green'
  },
  {
    displayName: 'item3',
    name: 'item3',
    effectiveTime: '2006-07-07 10:12:14',
    metric: 99,
    badgeColor: 'orange'
  }
]
const fileInfo = {
  name: 'aFileName',
  lastModified: '2016-07-07',
  lastRefresh: '2016-07-07 10:22'
}

const config = {
  filePrefixes: ['Clinics'],
  numDataPointsForSparkline: 10,
  numInitialFilesToDisplay: 3,
  page: {
    pageTitle: 'a page title',
    pageDescription: 'a page description',
    badgeUnits: 'xunits',
    listWidth: 3
  }
}

const createMockStore = (thisPage = 'somepage', _options) => {
  const defaults = {
    numVisible: 2,
    searchResults: [],
    config,
    fileInfo,
    currentUser: null
  }
  const options = Object.assign(defaults, _options)
  const storeOptions = {
    state: {
      measures: {
        measures: [{
            metric: 90,
            badgeColor: 'amaranth',
            history: []
          },
          {
            metric: 30,
            badgeColor: 'sarcoline',
            history: []
          }
        ]
      },
      pages: {
        files: {
          [thisPage]: files
        },
        selected: {
          [thisPage]: 0
        },
        numVisible: {
          [thisPage]: options.numVisible
        },
      },
      config: {
        [thisPage + 'Config']: options.config
      },
      search: {
        results: options.searchResults
      },
      user: {
        users: [{
            firstName: 'John',
            lastName: 'Johnson',
            password: 'abc'
          },
          {
            firstName: 'Fred',
            lastName: 'Fellows',
            password: 'def'
          }
        ],
        currentUser: options.currentUser
      },
      ui: {
        docsPanelIsOpen: false
      }
    },
    getters: {
      'pages/visibleFiles': (state) => (page) => files.slice(0, options.numVisible),
      'pages/fileInfo': (state) => (page) => options.fileInfo,
      'searchResutsCountForFile': (state) => (fileName) => 0
    },
    mutations: {
      'UPDATE_USER'(state, payload) {
        console.log('mockStore', payload)
      }
    }
  }
  const mockStore = new Vuex.Store(storeOptions)
  return mockStore
}

export {
  createMockStore,
  config,
  files,
  fileInfo
}
