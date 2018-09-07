/* eslint-disable no-undef */
import { mount, shallow, createLocalVue, cloneDeep } from '@vue/test-utils'

import Sparkline from '@/dashboard/components/Sparkline.vue'

describe('Sparkline component', () => {

  let mockStore, mockedServices, wrapper
  const id = 'testId'
  const history = [1, 2, 3, 4]

  beforeEach( () => {
    const mountOptions = {
      propsData: { id, history }
    }
    wrapper = mount(Sparkline, mountOptions)
  });

  it('should initialize the component', () => {
    expect(wrapper.vm).to.be.ok
  })

  it('should accept a input parameters', () => {
    expect(wrapper.vm.id).to.equal(id) 
    expect(wrapper.vm.history).to.equal(history) 
  })

  it('should convert history to points', () => {
    const points = wrapper.vm.draw()
    expect(points.split(' ').length).to.equal(history.length) // 0,3 33.333333333333336,11 66.66666666666667,19 100,27
  })

  it('should render the measure history', () => {
    const points = wrapper.find('polyline[points]').element.getAttribute('points').split(' ');
    expect(points).to.be.ok
  })

});
