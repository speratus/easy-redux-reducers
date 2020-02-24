let expect = require('expect.js')

let builder = require('../index')

describe('generateReducer', function() {
    describe('functions', function() {
        it('should return an object', function() {
            expect(typeof builder).to.be('object')
        })

        it('should have a key of setInitialState', function() {
            expect(builder.setInitialState).to.not.be(undefined)

            expect(typeof builder.setInitialState).to.be('function')
        })

        it('should have a key of addAction', function() {
            expect(builder.addAction).to.not.be(undefined)
            expect(typeof builder.addAction).to.be('function')
        })

        it('should have a key of buildReducer', function() {
            expect(builder.buildReducer).to.not.be(undefined)
            expect(typeof builder.buildReducer).to.be('function')
        })
    })

    describe('setInitialState', function() {
        it('should return undefined', function() {
            expect(builder.setInitialState({})).to.be(undefined)
        })
    })

    describe('addAction', function() {
        it('should return undefined', function() {
            expect(builder.addAction({}, ()=>{})).to.be(undefined)
        })

        it('should throw an error if given improper action type argument', function() {
            expect(builder.addAction.bind(this, 5, ()=>{})).to.throwError()
        })
    })

    describe('buildReducer', function() {
        it('should return a function and should return initial state plus "!"', function() {
            const initialState = {test: "Hello World"}
            builder.setInitialState(initialState)
            builder.addAction('DEMO', function(state, action) {
                return {
                    test: state.test + "!"
                }
            })
            const reducer = builder.buildReducer()
            expect(typeof reducer).to.be('function')

            expect(reducer(initialState, {type: 'DEMO'}).test).to.be("Hello World!")
        })

        it('should return state if the action passed to it is not recognized', function() {
            const initialState = {test: 'Hello World'}
            builder.setInitialState(initialState)
            builder.addAction('TEST', function(state, action) {
                return {
                    test: state.test + "!!"
                }
            })
            const reducer = builder.buildReducer()
            expect(reducer(initialState, {type: 'TSET'})).to.be(initialState)
        })

        it('should return state if the action passed to it is not defined', function() {
            const initialState = {test: 'Hello World'}
            builder.addAction('TEST', function(state, action) {
                return {
                    test: state.test + "!!"
                }
            })
            const reducer = builder.buildReducer()
            expect(reducer(initialState, undefined)).to.be(initialState)
        })

        it('should return initial state if reducer is called with no args', function() {
            const initialState = {test: 'Hello World'}
            builder.setInitialState(initialState)

            builder.addAction('TEST', function(state, action) {
                return {
                    test: state.test + "!!!"
                }
            })
            const reducer = builder.buildReducer()
            expect(reducer()).to.be(initialState)
        })
    })
})