import {
	GET_TILES_SUCCESS,
	GET_TILES_ERROR,
	GET_TILES_LOADING,
	CLEAR_STATE,
} from '../constants/get-tiles'

let initialState = {
	tiles: [],
	get_tiles_status: '',
}

export default function getTiles (state=initialState, action) {
	switch(action.type) {
	case GET_TILES_SUCCESS:
		return {
			...state,
			tiles: action.payload,
			get_tiles_status: 'success',
		}
	case GET_TILES_ERROR:
		return {
			...state,
			get_tiles_status: 'error',
		}
	case GET_TILES_LOADING:
		return {
			...state,
			get_tiles_status: 'loading',
		}
	case CLEAR_STATE:
		return {
			...initialState,
		}
	default:
		return state
	}
}
