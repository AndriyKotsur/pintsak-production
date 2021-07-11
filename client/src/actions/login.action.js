import {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_LOADING,
	LOGOUT,
	CHANGE_LOGIN_FORM,
} from '../constants/login'
import { COOKIES, HTTP } from '../helpers'

export const login = ({ email, password }) => {
	return async dispatch => {
		dispatch({ type: LOGIN_LOADING })
		try {
			const response = await HTTP.login({ email, password })
			COOKIES.setAuthToken(response.token)
			return dispatch({ type: LOGIN_SUCCESS })
		} catch (err) {
			console.error(err)
			return dispatch({ type: LOGIN_ERROR })
		}
	}
}

export const logout = () => {
	COOKIES.removeAuthToken()
	return dispatch => dispatch({ type: LOGOUT })
}

export const handleChange = event => {
	return {
		type: CHANGE_LOGIN_FORM,
		form: { [event.target.name]: event.target.value },
	}
}