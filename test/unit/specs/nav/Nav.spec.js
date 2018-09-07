/* eslint-disable no-undef */
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Nav from '@/nav/Nav.vue'
import router from '@/router/routes'
import { interceptor } from '@/testing-utils/test-interceptor'
import { createMockStore } from '@/testing-utils/test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueResource)

describe('Navbar component', () => {

  let mockStore, mockedServices, wrapper

  before(() => {
    localVue.http.interceptors.unshift(interceptor)
  })

  after(() => {
    localVue.http.interceptors.shift()
  })

  beforeEach( () => {
    mockStore = createMockStore()
  });
  afterEach(() => {
  })

  beforeEach( () => {
    const mountOptions = {
      store: mockStore, 
      router: router,
      localVue,
      propsData: { },
    }
    wrapper = shallow(Nav, mountOptions)
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('renders a nav element with class navbar', () => {
    expect(wrapper.is('nav')).to.be.ok
    expect(wrapper.classes()).to.contain('navbar')
  })

  it('renders a brand', () => {
    const brand = wrapper.find('a.navbar-brand')
    expect(brand.text()).to.equal('Migration Workbench')
  })

  it('renders 6 menu items', () => {
    const navbarListItems = wrapper.findAll('li > a')
    const texts = navbarListItems.wrappers.map(a => a.text().trim())
    const expected = ['Dashboard', 'Validations', 'Referential Integrity', 'Clinics', 'Team Tasks', 'Login']
    texts.forEach((text, i) => expect(text).to.equal(expected[i]))
  })

  it('renders the Login menu item to the right', () => {
    const rjustItem = wrapper.find('ul.navbar-right')
    expect(rjustItem.text().trim()).to.equal('Login')
  })
});
