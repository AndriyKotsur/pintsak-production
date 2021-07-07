import {
	GET_TILES_SUCCESS,
	GET_TILES_ERROR,
	GET_TILES_LOADING,
	GET_POPULAR_TILES_SUCCESS,
	GET_POPULAR_TILES_ERROR,
	GET_POPULAR_TILES_LOADING,
	CLEAR_GET_TILES_STATE,
} from '../constants/get-tiles'

let initialState = {
	pages: 0,
	tiles: [],
	popular_tiles: [],
	get_tiles_status: '',
	get_popular_tile_status: '',
}

export default function getTiles(state = initialState, action) {
	switch (action.type) {
		case GET_TILES_SUCCESS:
			return {
				...state,
				pages: action.payload.pages,
				tiles: action.payload.tiles,
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
		case GET_POPULAR_TILES_SUCCESS:
			return {
				...state,
				popular_tiles: action.payload,
				get_popular_tile_status: 'success',
			}
		case GET_POPULAR_TILES_ERROR:
			return {
				...state,
				get_popular_tile_status: 'error',
			}
		case GET_POPULAR_TILES_LOADING:
			return {
				...state,
				get_popular_tile_status: 'loading',
			}
		case CLEAR_GET_TILES_STATE:
			return {
				...initialState,
			}
		default:
			return state
	}
}