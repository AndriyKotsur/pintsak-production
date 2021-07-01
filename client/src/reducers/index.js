import { combineReducers } from 'redux'
import cart from './cart.reducer'
import getTile from './get-tile.reducer'
import getTiles from './get-tiles.reducer'
import getTypes from './get-types.reducer'
import addTile from './add-tile.reducer'
import addType from './add-type.reducer'
import editTile from './edit-tile.reducer'
import editType from './edit-type.reducer'
import deleteTile from './delete-tile.reducer'
import deleteType from './delete-type.reducer'
import login from './login.reducer'
import sendRequest from './send-request.reducer'

export default combineReducers({
	cart,
	getTile,
	getTiles,
	getTypes,
	addTile,
	addType,
	editTile,
	editType,
	deleteTile,
	deleteType,
	login,
	sendRequest,
})
