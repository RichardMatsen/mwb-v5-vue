/* eslint-disable no-undef */
import VueRouter from 'vue-router'
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import DashboardThumbnail from '@/dashboard/components/DashboardThumbnail.vue'
import router from '@/router/routes'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('DashboardThumbnail.vue', () => {

  let mockStore, wrapper
  const measure = {
    id: 'testId',
    title: 'measure title',
    icon: 'some_icon',
    link: 'some_link',
    metric: '789', 
    color: 'purple',
    history: [1, 2, 3, 4],
    narrative: 'test narrative'
  }
  
  beforeEach( () => {
    const mountOptions = {
      router: router,
      localVue,
      propsData: { measure }
    }
    wrapper = mount(DashboardThumbnail, mountOptions)
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('should accept a measure object as input', () => {
    expect(wrapper.vm.measure).to.equal(measure)    
  })

  it('should render the measure title', () => {
    expect(wrapper.find('span.title').text()).to.equal(measure.title)
  })

  it('should render the measure icon', () => {
    expect(wrapper.find('i.measure-icon').element.classList.contains(measure.icon)).to.equal(true)
  })

  it('should render the measure link', () => {
    expect(wrapper.find('a').attributes().href).to.equal('/' + measure.link)
  })

  it('should have a sparkline with measure id', () => {
    expect(wrapper.find('div.sparkline').attributes().id).to.equal(measure.id)
  })

  it('should render the measure history', () => {
    const points = wrapper.find('polyline[points]').element.getAttribute('points').split(' ');
    expect(points.length).to.equal(measure.history.length)
  })

  it('should have an errorBadge with measure metric and color', () => {
    const errorBadge = wrapper.find('span.error-badge')
    expect(errorBadge.text().trim()).to.equal(measure.metric)
    expect(errorBadge.element.classList.contains(measure.color)).to.equal(true)
  })

  it('should render the measure narrative', () => {
    expect(wrapper.find('div.narrative-text-container').text().trim()).to.equal(measure.narrative)
  })

});
