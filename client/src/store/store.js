import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import login from './reducer'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

function configureStore(initialState) {
	return createStoreWithMiddleware(login, initialState)
}

export const store = configureStore()