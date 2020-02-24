function generateReducer() {
    let actionMap = {}
    let initialState

    function setInitialState(initialState) {
        initialState = initialState
    }

    function addAction(action, callback) {
        switch(typeof action) {
            case 'object':
                actionMap[action.type] = callback
                break
            case 'function':
                actionMap[action().type] = callback
                break
            case 'string':
                actionMap[action] = callback
                break
            default:
                throw new Error("Action must be either an object, function or a string")
        }
    }

    function buildReducer() {
        return function(state = initialState, action) {
            processor = actionMap[action.type]
            if (processor) {
                return processor(state, action)
            }

            return state
        }
    }

    return {setInitialState, addAction, buildReducer}
}

module.exports = generateReducer()