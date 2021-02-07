import {
	EDIT_TILE_SUCCESS,
	EDIT_TILE_ERROR,
	EDIT_TILE_LOADING,
	GET_TILE_SUCCESS,
	GET_TILE_ERROR,
	GET_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_STATE,
	CLEAR_STATE,
} from '../constants/edit-tile'

let initialState = {
	types: [],
	title: '',
	url: '',
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
	imagesPreview: [],
	is_popular: false,
	is_available: false,
	get_tile_status: '',
	get_types_status: '',
	edit_tile_status: '',
}

export default function editTile (state = initialState, action) {
	switch(action.type) {
	case GET_TILE_SUCCESS:
		return {
			...state,
			...action.payload,
			imagesPreview: action.payload.images,
			grey: action.payload.color_price.grey,
			red: action.payload.color_price.red,
			yellow: action.payload.color_price.yellow,
			orange: action.payload.color_price.orange,
			brown: action.payload.color_price.brown,
			black: action.payload.color_price.black,
			get_tile_status: 'success',
		}
	case GET_TILE_ERROR:
		return {
			...state,
			get_tile_status: 'error',
		}
	case GET_TILE_LOADING:
		return {
			...state,
			get_tile_status: 'loading',
		}
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
	case EDIT_TILE_SUCCESS:
		return {
			...state,
			edit_tile_status: 'success',
		}
	case EDIT_TILE_ERROR:
		return {
			...state,
			edit_tile_status: 'error',
		}
	case EDIT_TILE_LOADING:
		return {
			...state,
			edit_tile_status: 'loading',
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