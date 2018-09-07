/* eslint-disable no-undef */
import flushPromises from 'flush-promises'

import { store } from '@/store/store'
import { mutations, actions } from '@/store/modules/load-status.store'

describe('store', () => {

  describe('load-status.store', () => {

    describe('mutations', () => {

      const calls = ['ON_FETCHING', 'ON_FETCH', 'ON_FAIL']
      calls.forEach(call => {
        it(call, () => {
          const state = {}
          const payload = { 
            resource: 'someResource', 
            status: 'someStatus'
          }
          mutations[call](state, payload)
          expect(state.someResource).to.equal('someStatus')
        })
      })
    })

    describe('actions', () => {

      let context, options, result
      beforeEach(() => {
        context = { commit: {}, state: {} }  // same properties as store
        options = {
          resource: 'someResource',
          fetch: () => Promise.resolve('someValue'),
          fail: () => {},
          timeout: 100
        }
      })

      let fetchSpy, failSpy, commitStub
      beforeEach(() => {
        fetchSpy = sinon.spy(options, 'fetch')
        failSpy = sinon.spy(options, 'fail')
        commitStub = sinon.stub(store, 'commit')
      })
      afterEach(() => {
        store.commit.restore()
        if(options.fetch && options.fetch.restore) {
          options.fetch.restore()
        }
        if(options.fail && options.fail.restore) {
          options.fail.restore()
        }
      })

      describe('waitForFetch', () => {

        describe('resource is NOT already loaded and NOT loading', () => {

          describe('when fetch succeeds', () => {
            beforeEach(() => {
              context.state.someResource = null
            })
            beforeEach(async() => {
              result = actions.waitForFetch(context, options)
              await flushPromises
            })
            it('should call fetch method passed in', () => {
              expect(fetchSpy).to.be.called
            })
            it('should call store ON_FETCHING', () => {
              expect(commitStub).to.be.calledWith('ON_FETCHING')
            })
            it('should call store ON_FETCH', () => {
              expect(commitStub).to.be.calledWith('ON_FETCH')
            })
          })

          describe('when fetch is not defined', () => {
            it('should throw an error', () => {
              const savedFetch = options.fetch
              options.fetch = null
              const run = () => {
                actions.waitForFetch(context, options)
              }
              expect(run).to.throw('Error: no fetch method was passed in for resource: someResource')
              options.fetch = savedFetch
            })
          })

          describe('when fetch fails', () => {
            let result
            beforeEach(async() => {
              options.fetch = () => Promise.reject('someValue')
              result = actions.waitForFetch(context, options)
              await flushPromises
            })
            it('should call fail method passed in', async() => {
              result.catch(x => {
                expect(failSpy).to.be.called
              })
            })
            it('should call store ON_FAIL', async() => {
              result.catch(x => {
                expect(commitStub).to.be.calledWith('ON_FAIL')
              })
            })
          })

        })
        
        describe('resource is already loaded', () => {

          beforeEach(() => {
            context.state.someResource = 'loaded...'
          })
          beforeEach(async() => {
            result = actions.waitForFetch(context, options)
            await flushPromises
          })
          it('should NOT call fetch method passed in', () => {
            expect(fetchSpy).not.to.be.called
          })
          it('should NOT call store ON_FETCHING', () => {
            expect(commitStub).not.to.be.calledWith('ON_FETCHING')
          })
          it('should NOT call store ON_FETCH', () => {
            expect(commitStub).not.to.be.calledWith('ON_FETCH')
          })
          it('should resolve to "already loaded"', () => {
            result.then(val => {
              expect(val).to.equal('already loaded')
            })
            .catch(err => console.log(err))
          })

        })

        describe('resource is already loading but NOT loaded', () => {

          beforeEach(() => {
            context.state.someResource = 'loading'
          })
          beforeEach(async() => {
            result = actions.waitForFetch(context, options)
            await flushPromises
          })
    
          describe('when prior fetch succeeds', () => {
            beforeEach(() => {
              // Simulate prior fetch succeeding
              context.state.someResource = 'loaded...'
            })
            it('should NOT call fetch method passed in', (done) => {
              result.then(val => {
                expect(fetchSpy).not.to.be.called
                done()
              })
            })
            it('should NOT call store ON_FETCHING', (done) => {
              result.then(val => {
                expect(commitStub).not.to.be.calledWith('ON_FETCHING')
                done()
              })
            })
            it('should NOT call store ON_FETCH', (done) => {
              result.then(val => {
                expect(commitStub).not.to.be.calledWith('ON_FETCH')
                done()
              })
            })
            it('should resolve to "loaded"', (done) => {
              setTimeout(function() {
                result.then(val => {
                  expect(val).to.equal('loaded')
                  done()
                })
              }, options.timeout + 200)
            })
          })

          describe('when prior fetch fails', () => {
            beforeEach(() => {
              // Simulate prior fetch failing
              context.state.someResource = 'failed - error: some error message'
            })
            it('should NOT call fetch method passed in', (done) => {
              result.catch(err => {
                expect(fetchSpy).not.to.be.called
                done()
              }) 
            })
            it('should NOT call store ON_FETCHING', (done) => {
              result.catch(err => {
                expect(commitStub).not.to.be.called
                done()
              })
            })
            it('should NOT call store ON_FETCH', (done) => {
              result.catch(err => {
                expect(commitStub).not.to.be.called 
                done()
              })
            })
            // it.only('should resolve to "failed"', (done) => {
            //   setTimeout(function() {
            //     result.catch(err => {
            //       console.log('err', err); 
            //       expect(err).to.equal('failed')
            //       done()
            //     })
            //   }, options.timeout + 200)
            // })
          })

        })

      })
    })
  })
})
    