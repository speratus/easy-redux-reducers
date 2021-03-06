[![Build Status](https://travis-ci.org/speratus/easy-redux-reducers.svg?branch=master)](https://travis-ci.org/speratus/easy-redux-reducers)
[![codecov](https://codecov.io/gh/speratus/easy-redux-reducers/branch/master/graph/badge.svg)](https://codecov.io/gh/speratus/easy-redux-reducers)
[![Maintainability](https://api.codeclimate.com/v1/badges/59a7a3e7443baffc3306/maintainability)](https://codeclimate.com/github/speratus/easy-redux-reducers/maintainability)
# Easy Redux Reducers
Easy Redux Reducers makes Redux developers' lives easier by enabling them to skip the overhead of writing
reducers manually. Instead, `easy-redux-reducers` gives developers a simple, clean library to use.

The typical flow for building a redux reducer requires developers to build reducers using switch statements. Generally, developers consider switch statements to be code smells in object oriented code. `easy-redux-reducers` eliminates the need to write switch statements in reducers.

## Why use Easy Redux Reducers?
Imagine we are building a reducer for a scenario in which we have an array of items in which each item is displayed one at a time. Consequently, we will also need a counter to keep track of the position in the array.

Our initial state could look something like this:
```js
const initialState = {
    items: [],
    currentItem: 0
}
```

We would probably have two actions: one to set the list of items and another to advance the `currentItem` counter.

Traditionally, we could write our reducer like this:
```js
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.items
            }
        case 'ADVANCE_COUNTER':
            return {
                ...state,
                currentItem: state.currentItem + 1
            }
        default:
            return state
    }
}
```
With Easy Redux Reducers, we would simply write the following:

```js
builder.addAction('SET_ITEMS', (state, action) => {
    return {
        ...state,
        items: action.items
    }
})

builder.addAction('ADVANCE_COUNTER', (state, action) => {
    return {
        ...state,
        currentItem: state.currentItem + 1
    }
})

const reducer = builder.buildReducer()
```

The second example is significantly cleaner and a little bit shorter, making reducer files more readable and much more maintainable.

# Usage Example
In order to use `easy-redux-reducers`, we first have to obtain a builder:
```js
import factory from 'easy-redux-reducers'

const builder = factory()
```
The builder is the base object necessary for using the library.

Next, we'll need to set the initial state of our reducer:
```js
const initialState = {
    items: [],
    currentItem: 0
}

builder.setInitialState(initialState)
```
This will allow Redux to properly initialize our reducer.

Adding an action to our reducer is very simple:
```js
builder.addAction('SET_ITEMS', (state, action) => {
    return {
        ...state,
        items: action.items
    }
})

//You can also use an action as the first argument of addAction

const advanceCounterAction = {type: 'ADVANCE_COUNTER'}

builder.addAction(advanceCounterAction, (state, action) => {
    return {
        ...state,
        currentItem: state.currentItem + 1
    }
})

//You can even use an action function as the first 
//argument for addAction

function advanceCounter() {
    return {
        type: 'ADVANCE_COUNTER',
    }
}

builder.addAction(advanceCounter, (state, action) => {
    return {
        ...state,
        currentItem: state.currentItem + 1
    }
})
```
Once we have added all the actions necessary, all we have 
to do is build the reducer:
```js
const reducer = builder.buildReducer()
```

For more details, see [addAction details](#addaction-details).

# Installation

You can install `easy-redux-reducers` from npm.
```
npm install easy-redux-reducers
```
You can also install `easy-redux-reducers` from Github.
```
npm install git+https://github.com/speratus/easy-redux-reducers.git
```

# addAction Details
`builder.addAction` takes two arguments. The first is the 
action type. Action Type can be one of three types:

 * A String, such as `SET_ITEM`.
 * An action object such as:
 ```js 
 {type: 'SET_ITEM'}
 ```
 * Or a function such as:
 ```js
 function setItems(items) {
     return {
         type: 'SET_ITEMS',
         items
     }
 }
 ```

 The second argument is a callback that the reducer runs 
 when it receives the action type. 
 Callbacks should accept two arguments, the first is the 
 current state and the second is the action object that was 
 passed to the reducer.

Typically, callbacks will be arrow functions like so:
```js
builder.addAction('ADVANCE_COUNTER', (state, action) => {
    return {
        ...state,
        currentItem: state.currentItem + 1
    }
})
```
However, if you are using action files to contain action 
builders, you could create the callback in the same file 
and import the callback and pass it to `addAction` as well 
as the action builder.

```js
// actions/setItem.js
export default function setItem(items) {
    return {
        type: 'SET_ITEMS',
        items
    }
}

export function reducerCallback(state, action) {
    return {
        ...state,
        items: action.items
    }
}
```

```js
// reducers/itemsReducer.js
import factory from 'easy-redux-reducers'

import setItem, {reducerCallback} from '../actions/setItem'

const initialState = {
    items: [],
    currentItem: 0
}

const builder = factory()

builder.setInitialState(initialState)

builder.addAction(setItem, reducerCallback)

const reducer = builder.buildReducer()
```
