import {
	EDIT_TYPE_SUCCESS,
	EDIT_TYPE_ERROR,
	EDIT_TYPE_LOADING,
	GET_TYPE_SUCCESS,
	GET_TYPE_ERROR,
	GET_TYPE_LOADING,
	CHANGE_STATE,
	CLEAR_STATE,
} from '../constants/edit-type'

let initialState = {
	title: '',
	get_type_status: '',
	edit_type_status: '',
}

export default function editType (state=initialState, action) {
	switch (action.type) {
	case GET_TYPE_SUCCESS:
		return {
			...state,
			...action.payload,
			get_type_status: 'success',
		}
	case GET_TYPE_ERROR:
		return {
			...state,
			get_type_status: 'error',
		}
	case GET_TYPE_LOADING:
		return {
			...state,
			get_type_status: 'loading',
		}
	case EDIT_TYPE_SUCCESS:
		return {
			...state,
			edit_type_status: 'success',
		}
	case EDIT_TYPE_ERROR:
		return {
			...state,
			edit_type_status: 'error',
		}
	case EDIT_TYPE_LOADING:
		return {
			...state,
			edit_type_status: 'loading',
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