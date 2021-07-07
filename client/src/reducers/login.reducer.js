import {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_LOADING,
	LOGOUT,
	CHANGE_LOGIN_FORM,
} from '../constants/login'

let initialState = {
	email: '',
	password: '',
	isAuth: false,
	loginStatus: '',
}

export default function login(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				loginStatus: 'success',
			}
		case LOGIN_ERROR:
			return {
				...state,
				isAuth: false,
				loginStatus: 'error',
			}
		case LOGIN_LOADING:
			return {
				...state,
				loginStatus: 'loading',
			}
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				email: '',
				password: '',
				loginStatus: '',
			}
		case CHANGE_LOGIN_FORM:
			return {
				...state,
				...action.form,
			}
		default:
			return state
	}
}
