import {
	DELETE_TYPE_SUCCESS,
	DELETE_TYPE_ERROR,
	DELETE_TYPE_LOADING,
} from '../constants/delete-type'

let initialState = {
	delete_type_status: '',
}

export default function deleteType(state = initialState, action) {
	switch (action.type) {
		case DELETE_TYPE_SUCCESS:
			return {
				...state,
				delete_type_status: 'success',
			}
		case DELETE_TYPE_ERROR:
			return {
				...state,
				delete_type_status: 'error',
			}
		case DELETE_TYPE_LOADING:
			return {
				...state,
				delete_type_status: 'loading',
			}
		default:
			return state
	}
}