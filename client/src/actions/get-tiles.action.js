import {
	GET_TILES_SUCCESS,
	GET_TILES_ERROR,
	GET_TILES_LOADING,
	CLEAR_STATE,
} from '../constants/get-tiles'
import {
	HTTP,
} from 'helpers'

export const getTiles = (page, sortBy, orderBy) => {
	return async dispatch => {
		dispatch({
			type: GET_TILES_LOADING,
		})
		try {
			const response = await HTTP.getTiles({page, sortBy, orderBy})
			return dispatch({
				type: GET_TILES_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			return dispatch({
				type: GET_TILES_ERROR,
			})
		}
	}
}

export const clear = () => ({
	type: CLEAR_STATE,
})