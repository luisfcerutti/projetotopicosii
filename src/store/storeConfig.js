import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer from './reducers/user'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer
})

const storeConfig = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)))
}

export default storeConfig