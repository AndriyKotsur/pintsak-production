import LoginTypes from './constants'

let initialState = {
	email: '',
	password: '',
	isAuth: false,
	loginStatus: ''
}

export default function login (state = initialState, action) {
	switch(action.type) {
		case LoginTypes.LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				loginStatus: 'success'
			}
		case LoginTypes.LOGIN_ERROR:
			return {
				...state,
				isAuth: false,
				loginStatus: 'error'
			}
		case LoginTypes.LOGIN_LOADING:
			return {
				...state,
				loginStatus: 'loading'
			}
		case LoginTypes.LOGOUT:
			return {
				...state,
				isAuth: false,
				email: '',
				password: '',
				loginStatus: ''
			}
		case LoginTypes.CHANGE_FORM:
			return {
				...state,
				...action.form,
			}
		default:
			return state
	}
}