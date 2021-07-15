import { combineReducers } from 'redux'
import addTile from './add-tile.reducer'
import addType from './add-type.reducer'
import editTile from './edit-tile.reducer'
import editType from './edit-type.reducer'
import deleteTile from './delete-tile.reducer'
import deleteType from './delete-type.reducer'
import getTile from './get-tile.reducer'
import getTiles from './get-tiles.reducer'
import getTypes from './get-types.reducer'
import login from './login.reducer'
import cart from './cart.reducer'
import sendRequest from './send-request.reducer'

export default combineReducers({
	addTile,
	addType,
	editTile,
	editType,
	deleteTile,
	deleteType,
	getTile,
	getTiles,
	getTypes,
	cart,
	login,
	sendRequest,
})
