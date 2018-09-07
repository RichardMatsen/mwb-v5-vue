import Vue from 'vue'

export default {
  getFileList () {
    return Vue.http.get('filelist.txt')
      .then(response => {
        const files = response.body.replace(/\r/, '').split(/\n/)
          .map(file => file.trim())
          .filter(file => !!file)
        return files
      })
      .catch(err => console.error('getFileList() failed', err) )
  },
  getFile (fileName) {
    const url = fileName.trim() + '.html';
    return Vue.http.get(url)
      .then((response) => {
        return response;
      })
      .catch(err => console.error('getFile() failed', err) )
  }
}
