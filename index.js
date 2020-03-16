function mapAction(map, action, callback) {
    switch(typeof action) {
        case 'object':
            if (!action.type) {
                throw new TypeError("action must be a valid action object.")
            }
            map[action.type] = callback
            break
        case 'function':
            if (!action().type) {
                throw new TypeError("action() must return a valid action object.")
            }
            map[action().type] = callback
            break
        case 'string':
            map[action] = callback
            break
        default:
            throw new Error("Action must be either an object, function, or a string")
    }
}

function generateReducer() {
    let actionMap = {}
    let initialState

    function setInitialState(state) {
        initialState = state
    }

    function addAction(action, callback) {
        mapAction(actionMap, action, callback)
    }

    function buildReducer() {
        return (state = initialState, action) => {
            if (action && actionMap[action.type]) {
                let processor = actionMap[action.type]
                return processor(state, action)
            }

            return state
        }
    }

    return {setInitialState, addAction, buildReducer}
}

module.exports = generateReducer