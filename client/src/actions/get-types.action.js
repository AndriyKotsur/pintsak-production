import {
	GET_TYPES_SUCCESS,
	GET_TYPES_ERROR,
	GET_TYPES_LOADING,
	CLEAR_GET_TYPES_STATE,
} from '../constants/get-types'

import {
	HTTP,
} from 'helpers'

export const getTypes = () => {
	return async dispatch => {
		dispatch({
			type: GET_TYPES_LOADING,
		})

		try {
			const response = await HTTP.getTypes()

			return dispatch({
				type: GET_TYPES_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: GET_TYPES_ERROR,
			})
		}
	}
}

export const clear = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_GET_TYPES_STATE,
		})	
	}
}