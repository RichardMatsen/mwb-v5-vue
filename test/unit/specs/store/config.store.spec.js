
import { mutations } from '@/store/modules/config.store'

describe('store', () => {

  describe('config.store', () => {

    describe('mutations', () => {

      it('SET_CONFIG', () => {
        const state = {}
        const payload = { 
          baseDataUrl: 'some url', 
          clinicsConfig: { id: 'some id' },
          validationsConfig: { id: 'some id' },
          referentialsConfig: { id: 'some id' },
        }
        mutations.SET_CONFIG(state, payload)
        Object.keys(payload).forEach(key => {
          expect(state[key]).to.deep.equal(payload[key])
        })
      })

    })
  })
});
    