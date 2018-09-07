import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import injector from 'vue-inject';
import { mount as vtu_mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'
require('@/services/injector-register');  // eslint-disable-line no-undef

Vue.use(Vuex)
Vue.use(injector);
Vue.use(VueResource)

export default {
  mount (component, options) {
    return mount(component, options)
  }
}

const mount = (component, options) => {
  const wrapper = vtu_mount(component, options)
  if (options.mockInjects) {
    wrapper.vm = {...wrapper.vm, ...options.mockInjects}
  }
  return wrapper
}

// Vue.use(VueResource)
// Vue.http.options.root = './static/data/'
// const measures = {
//   measures: [
//     { id: "test1", title: "Test measure 1", icon: "", link: "", metric: "0", color: "grey" },
//     { id: "test2", title: "Test measure 2", icon: "", link: "", metric: "0", color: "grey" }
//   ]
// }
// const filelist = `
//   Clinics DB3 (01 Jun 2016 - 11.00).html
//   Clinics DB3 (03 Jun 2016 - 11.00).html
// `
// Vue.http.interceptors.unshift((request, next) => {
//   if (request.url === 'migration-workbench.config.json') {
//     next(request.respondWith( {}, {status: 200} ));
//   }
//   if (request.url === 'InitialMeasures.json') {
//     next(request.respondWith( JSON.stringify(measures), {status: 200} ));
//   }
//   if (request.url === 'filelist.txt') {
//     next(request.respondWith( filelist, {status: 200} ));
//   }
// });

// spies = {
//   configService: {
//     checkConfig: sinon.spy(mockedServices.configService, 'checkConfig')
//   },
//   dataService: {
//     checkAllFiles: sinon.spy(mockedServices.dataService, 'checkAllFiles')
//   },
//   measureService: {
//     checkMeasures: sinon.spy(mockedServices.measureService, 'checkMeasures'),
//     updateMeasures: sinon.spy(mockedServices.measureService, 'updateMeasures')
//   },
// }
// spy = sinon.spy(mockedServices.configService, 'checkConfig')
// console.log('spies.configService.checkConfig', typeof spies.configService.checkConfig)
// console.log('spies.configService.checkConfig', Object.keys(spies.configService.checkConfig))
// console.log('mockedServices.configService.checkConfig', Object.keys(mockedServices.configService.checkConfig))

// afterEach(() => {
//   // mockedServices.configService.checkConfig.restore()
//   // mockedServices.dataService.checkAllFiles.restore()
//   // mockedServices.measureService.checkMeasures.restore()
// });

  // beforeEach( () => {
  //   testApp = new Vue({
  //     template: '<dashboard ref="dashboard"></dashboard>',
  //     components: {
  //       'dashboard': DashboardWithMocks
  //     },
  //     store, 
  //     router
  //   }).$mount()
  //   component = testApp.$refs.dashboard
  // });

  // it('should initialize the component', () => {
  //   // const Constructor = Vue.extend(DashboardWithMocks);
  //   // const DashboardComponent = new Constructor({mockStore, router}).$mount();
  //   // expect(DashboardComponent).to.be.ok
  //   // wrapper = mount(Dashboard, { store: mockStore, router })
  //   expect(wrapper.vm).to.be.ok
  // })

  
  // console.log('spies.configService.checkConfig.called', spies.configService.checkConfig.called)
  // console.log('spies.measureService.checkMeasures.called', spies.measureService.checkMeasures.called)
  // console.log('mockedServices.dataService.checkAllFiles.called', mockedServices.dataService.checkAllFiles.called)
  // console.log('mockedServices.dataService.checkAllFiles.calls', mockedServices.dataService.checkAllFiles.calls)
  // // console.log('spy.called', spy.called)
  // // console.log('mockedServices.configService.checkConfig.called', mockedServices.configService.checkConfig.called)
  // // expect(spies.configService.checkConfig.called).to.equal(true)
  // // expect(spies.dataService.checkAllFiles.called).to.equal(true)
  // // expect(spies.configService.checkConfig.called).to.equal(true)
  // // expect(spies.configService.checkConfig.called).to.equal(true)
