import {
	ADD_TYPE_SUCCESS,
	ADD_TYPE_ERROR,
	ADD_TYPE_LOADING,
	CHANGE_STATE,
	CLEAR_STATE,
} from 'constants/add-type'

let initialState = {
	title: '',
	add_type_status: '',
}

export default function addType (state = initialState, action) {
	switch(action.type) {
	case ADD_TYPE_SUCCESS:
		return {
			...state,
			add_type_status: 'success',
		}
	case ADD_TYPE_ERROR:
		return {
			...state,
			add_type_status: 'error',
		}
	case ADD_TYPE_LOADING:
		return {
			...state,
			add_type_status: 'loading',
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