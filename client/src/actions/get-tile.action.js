import {
	GET_TILE_SUCCESS,
	GET_TILE_ERROR,
	GET_TILE_LOADING,
	CLEAR_GET_TILE_STATE,
} from '../constants/get-tile'
import {
	HTTP,
} from 'helpers'

export const getTile = url => {
	return async dispatch => {
		dispatch({
			type: GET_TILE_LOADING,
		})
		try {
			const response = await HTTP.getTile(url)
			return dispatch({
				type: GET_TILE_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)
			return dispatch({
				type: GET_TILE_ERROR,
			})
		}
	}
}

export const clear = () => ({
	type: CLEAR_GET_TILE_STATE,
})