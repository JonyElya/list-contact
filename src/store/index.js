import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {usersReducer} from "./users/reducers";

const rootReducer = combineReducers({
    users: usersReducer
})

export const store = createStore(
   rootReducer,
    process.env.NODE_ENV === 'development'
        ? compose(
        applyMiddleware(thunk),
        (window).__REDUX_DEVTOOLS_EXTENSION__ && (window).__REDUX_DEVTOOLS_EXTENSION__(),
)
: applyMiddleware(thunk),
)