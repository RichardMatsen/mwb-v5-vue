// import { store } from '../store/store'
import filesByDateService from './files-by-date.service'

export default {
  clinicsHistory (files) {
    const data = files
      .filter(f => f.metric)
      .map(f => (+f.metric.replace('%', '')));
    const min = Math.min(...data);
    const history = data
      .map(d => +(d - min + 1).toFixed(4))
      .reverse();
    return history
  },
  
  validationsHistory (files) {
    return files
      .filter(f => f.metric)
      .map(f => f.metric)
      .reverse()
  },
  
  referentialsHistory (files) {
    return filesByDateService.filesByDate(files)
      .map(x => {
        return x.files.reduce((total, file) => { return total + (file.metric || 0) }, 0)
      }).reverse()
  }
}
