import LoginTypes from './constants'
import { COOKIES, HTTP } from '../helpers'

export const login = ({email, password}) => {
	return async dispatch => {
		dispatch({ type: LoginTypes.LOGIN_LOADING })
		try {
			console.log(email, password);
			const response = await HTTP.login({email, password})
			COOKIES.setAuthToken(response.token)
			return dispatch({ type: LoginTypes.LOGIN_SUCCESS })
		} catch (err) {
			return dispatch({ type: LoginTypes.LOGIN_ERROR })
		}
	}
}

export const logout = () => {
	COOKIES.removeAuthToken()
	return dispatch => dispatch({ type: LoginTypes.LOGOUT })
}

export const handleChange = event => {
	return {
		type: LoginTypes.CHANGE_FORM,
		form: {[event.target.name]:event.target.value},
	}
}