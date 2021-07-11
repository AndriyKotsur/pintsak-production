import {
	DELETE_TILE_SUCCESS,
	DELETE_TILE_ERROR,
	DELETE_TILE_LOADING,
} from '../constants/delete-tile'

let initialState = {
	delete_tile_status: '',
}

export default function deleteTile(state = initialState, action) {
	switch (action.type) {
		case DELETE_TILE_SUCCESS:
			return {
				...state,
				delete_tile_status: 'success',
			}
		case DELETE_TILE_ERROR:
			return {
				...state,
				delete_tile_status: 'error',
			}
		case DELETE_TILE_LOADING:
			return {
				...state,
				delete_tile_status: 'loading',
			}
		default:
			return state
	}
}