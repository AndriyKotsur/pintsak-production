import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger({
	level: 'info',
})

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore)

function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState)
}

export const store = configureStore()
