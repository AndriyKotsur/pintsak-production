import {
	GET_TYPES_SUCCESS,
	GET_TYPES_ERROR,
	GET_TYPES_LOADING,
	CLEAR_STATE,
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
			if (response.success)
				return dispatch({
					type: GET_TYPES_SUCCESS,
					payload: response.data,
				})
			else throw new Error()
		} catch (err) {
			return dispatch({
				type: GET_TYPES_ERROR,
			})
		}
	}
}

export const clear = () => ({
	type: CLEAR_STATE,
})