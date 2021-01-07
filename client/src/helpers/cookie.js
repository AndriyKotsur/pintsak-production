import Cookies from 'js-cookie'

const setAuthToken = token => {
	Cookies.set('auth_token', token)
	return true
}

const getAuthToken = () => {
	return Cookies.get('auth_token')
}

const removeAuthToken = () => {
	try {
		Cookies.remove('auth_token')
		return true
	} catch (e) {
		return false
	}
}

const COOKIES = {
	setAuthToken,
	getAuthToken,
	removeAuthToken,
}

export default COOKIES