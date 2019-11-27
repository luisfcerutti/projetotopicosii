import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer from './reducers/user'
import mercadoReducer from './reducers/mercado'
import cidadeReducer from './reducers/cidade'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
    mercado: mercadoReducer,
    cidade: cidadeReducer
})

const storeConfig = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)))
}

export default storeConfig