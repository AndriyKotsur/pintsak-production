import {
	ADD_TILE_SUCCESS,
	ADD_TILE_ERROR,
	ADD_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_STATE,
	CLEAR_STATE,
} from '../constants/add-tile'

let initialState = {
	types: [],
	title: '',
	type: '',
	width: '',
	height: '',
	thickness: '',
	grey: null,
	yellow: '-',
	orange: '-',
	red: '-',
	brown: '-',
	black: '-',
	weight_per_meter: '',
	pieces_per_meter: '',
	images: [],
	is_popular: false,
	is_available: false,
	add_tile_status: '',
	get_types_status: '',
}

export default function addTile (state = initialState, action) {
	switch(action.type) {
	case GET_TILE_TYPES_SUCCESS:
		return {
			...state,
			types: action.payload,
			get_types_status: 'success',
		}
	case GET_TILE_TYPES_ERROR:
		return {
			...state,
			get_types_status: 'error',
		}
	case GET_TILE_TYPES_LOADING:
		return {
			...state,
			get_types_status: 'loading',
		}
	case ADD_TILE_SUCCESS:
		return {
			...state,
			add_tile_status: 'success',
		}
	case ADD_TILE_ERROR:
		return {
			...state,
			add_tile_status: 'error',
		}
	case ADD_TILE_LOADING:
		return {
			...state,
			add_tile_status: 'loading',
		}
	case CHANGE_STATE:
		return {
			...state,
			...action.form,
		}
	case CLEAR_STATE:
		return {
			...initialState,
		}
	default:
		return state
	}
}