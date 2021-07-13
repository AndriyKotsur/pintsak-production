import {
	GET_TYPES_SUCCESS,
	GET_TYPES_ERROR,
	GET_TYPES_LOADING,
	CLEAR_GET_TYPES_STATE,
} from '../constants/get-types'

let initialState = {
	types: [],
	get_types_status: '',
}

export default function getTiles(state = initialState, action) {
	switch (action.type) {
		case GET_TYPES_SUCCESS:
			return {
				...state,
				types: action.payload,
				get_types_status: 'success',
			}
		case GET_TYPES_ERROR:
			return {
				...state,
				get_types_status: 'error',
			}
		case GET_TYPES_LOADING:
			return {
				...state,
				get_types_status: 'loading',
			}
		case CLEAR_GET_TYPES_STATE:
			return {
				...initialState,
			}
		default:
			return state
	}
}