import {
	ADD_TILE_SUCCESS,
	ADD_TILE_ERROR,
	ADD_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_ADD_TILE_STATE,
	CHANGE_ADD_TILE_COLOR,
	CLEAR_ADD_TILE_STATE,
} from '../constants/add-tile'

let initialState = {
	types: [],
	title: '',
	type: '',
	sizes: {
		measurement: 'Квадратний метр',
		weight: '',
		quantity: '',
		width: '',
		height: '',
		thickness: '',
	},
	prices: {},
	images: [],
	is_popular: false,
	is_available: false,
	add_tile_status: '',
	get_types_status: '',
}

export default function addTile(state = initialState, { type, payload, form, field }) {
	switch (type) {
		case GET_TILE_TYPES_SUCCESS:
			return {
				...state,
				types: payload,
				type: payload[0]._id,
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
		case CHANGE_ADD_TILE_COLOR:
			return {
				...state,
				prices: {
					...state.prices,
					...payload
				}
			}
		case CHANGE_ADD_TILE_STATE:
			if (field) {
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
		case CLEAR_ADD_TILE_STATE:
			return {
				...initialState,
			}
		default:
			return state
	}
}