import {
	DELETE_TILE_SUCCESS,
	DELETE_TILE_ERROR,
	DELETE_TILE_LOADING,
} from '../constants/delete-tile'

import {
	HTTP,
} from 'helpers'

export const deleteTile = id => {
	return async dispatch => {
		dispatch({
			type: DELETE_TILE_LOADING,
		})

		try {
			await HTTP.deleteTile(id)
			
			return dispatch({
				type: DELETE_TILE_SUCCESS,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: DELETE_TILE_ERROR,
			})
		}
	}
}