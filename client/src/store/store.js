import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import login from './reducer'

const logger = createLogger({
	level: 'info',
})

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore)

function configureStore(initialState) {
	return createStoreWithMiddleware(login, initialState)
}

export const store = configureStore()
