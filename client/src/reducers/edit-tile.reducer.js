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
	DELETE_IMAGE,
	CHANGE_STATE,
	CLEAR_STATE,
	CHANGE_COLOR
} from '../constants/edit-tile'

let initialState = {
	types: [],
	title: '',
	type: '',
	sizes: {
		width: '',
		height: '',
		thickness: '',
		weight: '',
		quantity: '',
		measurement: '',
	},
	prices: {},
	images: [],
	imagesPreview: [],
	is_popular: false,
	is_available: false,
	get_tile_status: '',
	get_types_status: '',
	edit_tile_status: '',
}

export default function editTile (state = initialState, {type, payload, form, field}) {
	switch(type) {
	case GET_TILE_SUCCESS:
		return {
			...state,
			...payload.tile,
			imagesPreview: payload.tile.images,
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
			types: payload,
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
	case DELETE_IMAGE:
		return {
			...state,
			imagesPreview: state.imagesPreview.filter(image => image !== payload)
		}
	case CHANGE_COLOR:
		return {
			...state,
			prices: {
				...state.prices,
				...payload
			}
		}
	case CHANGE_STATE:
		if(field) {
			return {
				...state,
				[field]: {
					...state[field],
					...form[field],
				},
			}
		} else {
			return {
				...state,
				...form,
			}
		}
	case CLEAR_STATE:
		return {
			...initialState,
		}
	default:
		return state
	}
}
