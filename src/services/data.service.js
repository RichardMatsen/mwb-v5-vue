import FileService from './file.service'
import NameParsingService from './name-parsing.service'
import ListFormatterService from './list-formatter.service'
import DataMetricService from './data-metric.service'
import DataHtmlService from './data-html.service'
import { store } from '../store/store'

export default {
  checkAllFiles () {
    return Promise.all([  // eslint-disable-line no-undef
      this.checkFiles('validations'),
      this.checkFiles('referentials'),
      this.checkFiles('clinics'),
    ])
  },
  checkFiles (page) {
    return checkFiles(page)
  },
  getFiles (page) {
    return getFiles(page)
  },
  updateContent (fileType, numToInitialize) {
    return updateContent(fileType, numToInitialize)
  },
  refreshFile (fileType, fileInfo) {
    return refreshFile(fileType, fileInfo)
  }
}

const refreshFile = (page, fileInfo) => {
  getContent(page, fileInfo).then(fileInfo => {
    store.commit('pages/SET_FILE', {page, fileInfo})
  })
}

const checkFiles = (page) => {
  const files = store.state.pages.files[page]
  if (!files || !files.length) {
    return store.dispatch('waitForFetch', {
      resource: 'files/' + page,
      fetch: () => getFiles(page),
    })
  } else {
    return Promise.resolve()  // eslint-disable-line no-undef
  }
}

const updateContent = (fileType, numToInitialize) => {
  return Promise.all(  // eslint-disable-line no-undef
    store.state.pages.files[fileType]
      .slice(0, numToInitialize)
      .filter(file => !file.content)
      .map(file => getContent(fileType, file))
  ) 
}

const getFiles = (page) => {
  const filesPromise = FileService.getFileList()
    .then(fileList => {
      const prefixes = store.state.config[page + 'Config'].filePrefixes
      const filesOfType = fileList.filter(file => prefixes.some(value => file.startsWith(value)));
      return processFiles( filesOfType, page, prefixes )
    })
    .then(files => {
      const daysToDisplay = store.state.config[page + 'Config'].daysToDisplay
      store.dispatch('pages/setFiles', {page, files, daysToDisplay})
    })
  return filesPromise
}

const processFiles = (fileList, fileType, filePrefixes) => {
  if (!fileList.length) {
    return Promise.resolve()  // eslint-disable-line no-undef
  }
  const parsed = NameParsingService.parseFiles(fileList, filePrefixes)
  const formatted = ListFormatterService.process(parsed)
  return setContentForList(fileType, formatted)
}

const setContentForList = (fileType, fileInfos) => {
  const numToInitialize = store.state.config[fileType + 'Config'].numToInitialize 
  const withContent = fileInfos.slice(0, numToInitialize)
    .map(fileInfo => !fileInfo.content 
      ? getContent(fileType, fileInfo) 
      : Promise.resolve(fileInfo) // eslint-disable-line no-undef
    );
  const withoutContent = fileInfos.slice(numToInitialize)
    .map(fileInfo => Promise.resolve(fileInfo));  // eslint-disable-line no-undef
  const combined = withContent.concat(withoutContent);
  return Promise.all(combined)  // eslint-disable-line no-undef
}

const getContent = (fileType, fileInfo) => {
  return FileService.getFile(fileInfo.name)
    .then(response => {
      const date = response.headers ? response.headers.get('last-modified') : null
      fileInfo.lastModified = date ? new Date(date) : null;
      fileInfo.lastRefresh = new Date()
      return processContent(fileType, response.body, fileInfo);
    })
}

const processContent = (fileType, content, fileInfo) => {
  if (!content) {
    return fileInfo
  }
  const id = 'dataContainer';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = DataHtmlService.removeCommandTimeout(content);
  DataHtmlService.prefixStylesWithId(tempDiv, id);
  fileInfo.content = tempDiv.innerHTML;
  fileInfo.metric = DataMetricService.getMetric(fileType, tempDiv);
  fileInfo.badgeColor = DataMetricService.getBadgeColor(fileType, fileInfo.metric);
  return fileInfo;
}
