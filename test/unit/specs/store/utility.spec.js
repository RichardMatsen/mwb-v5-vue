
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { flatStateGetters } from '@/store/store'

// Module defns as supplied to store constructor
const module1 = {
  state: {
    module1prop1: 'a',
    module1prop2: 'b'
  }
}
const module2 = {
  state: {
    module2prop1: 'c',
    module2prop2: 'd'
  }
}
const modules = {module1, module2}

describe('store', () => {

  describe('utility', () => {

    describe('flatStateGetters', () => {

      it('should create getters from state in multiple modules', () => {
        const store = new Vuex.Store({
          modules,
          getters: flatStateGetters(modules)
        })
        
        expect(store.getters.module1prop1).to.equal('a')
        expect(store.getters.module1prop2).to.equal('b')
        expect(store.getters.module2prop1).to.equal('c')
        expect(store.getters.module2prop2).to.equal('d')
      })
    })
  })
})
