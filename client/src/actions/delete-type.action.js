import {
	DELETE_TYPE_SUCCESS,
	DELETE_TYPE_ERROR,
	DELETE_TYPE_LOADING,
} from '../constants/delete-type'
import {
	HTTP,
} from 'helpers'

export const deleteType = id => {
	return async dispatch => {
		dispatch({
			type: DELETE_TYPE_LOADING,
		})
		try {
			await HTTP.deleteType(id)
			return dispatch({
				type: DELETE_TYPE_SUCCESS,
			})
		} catch (err) {
			console.error(err)
			return dispatch({
				type: DELETE_TYPE_ERROR,
			})
		}
	}
}