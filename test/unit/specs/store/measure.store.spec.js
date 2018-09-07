/* eslint-disable no-undef */
import { mutations } from '@/store/modules/measures.store'

describe('store', () => {

  describe('measure.store', () => {

    describe('mutations', () => {

      it('SET_MEASURES', () => {
        const state = {}
        const payload = [ { id: 'measure1' }, { id: 'measure2' } ]
        mutations.SET_MEASURES(state, payload)
        expect(state.measures).to.deep.equal(payload)
      })

      context('UPDATE_MEASURE', () => {

        describe('when id matches an existing measure', () => {
          it('should update the measure', () => {
            const state = { measures: [ { id: 'clinics' } ] }
            const payload = { measure: { id: 'clinics', metric: 2 }, tag: 'clinics' }
            mutations.UPDATE_MEASURE(state, payload)
            const expected = { id: 'clinics', tag: 'clinics', metric: 2, status: 'updated' }
            Object.keys(state.measures[0]).forEach(key => {
              expect(state.measures[0][key]).to.deep.equal(expected[key])
            })
          })
        })

        describe('when id does not match an existing measure', () => {
          it('should NOT update the measure', () => {
            const state = { measures: [ { id: 'clinics' } ] }
            const payload = { measure: { id: 'notClinics', metric: 2 }, tag: 'clinics' }
            mutations.UPDATE_MEASURE(state, payload)
            expect(state).to.deep.equal({ measures: [ { id: 'clinics' } ] })
          })
        })

      })
    })
  })
})