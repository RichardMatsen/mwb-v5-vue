/* eslint-disable no-undef */
import injector from 'vue-inject';

const mockedServices = {
  configService: {
    checkConfig: () => { console.log('mock->checkConfig'); return Promise.resolve() },
  },
  dataService: {
    checkAllFiles: () => { console.log('mock->checkAllFiles'); return Promise.resolve() }
  },
  measureService: {
    checkMeasures: () => { console.log('mock->checkMeasures'); return Promise.resolve() },
    updateMeasures: () => { }
  },
  searchService: {
    getResults: () => { },
    clearResults: () => { }
  }
}
injector.service('configService',  function() { return mockedServices.configService });
injector.service('dataService',    function() { return mockedServices.dataService });
injector.service('measureService', function() { return mockedServices.measureService });
injector.service('searchService', function() { return mockedServices.searchService });

const servicesInjector =  injector 

export {
  servicesInjector
}
