import { combineReducers } from 'redux'
import addTile from './add-tile.reducer'
import login from './login.reducer'

export default combineReducers({
	login,
	addTile,
})