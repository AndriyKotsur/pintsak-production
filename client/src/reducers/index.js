import { combineReducers } from 'redux'
import addTile from './add-tile.reducer'
import addType from './add-type.reducer'
import editTile from './edit-tile.reducer'
import editType from './edit-type.reducer'
import login from './login.reducer'

export default combineReducers({
	login,
	addTile,
	addType,
	editTile,
	editType,
})