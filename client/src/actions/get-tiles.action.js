import {
	GET_TILES_SUCCESS,
	GET_TILES_ERROR,
	GET_TILES_LOADING,
	GET_POPULAR_TILES_SUCCESS,
	GET_POPULAR_TILES_ERROR,
	GET_POPULAR_TILES_LOADING,
	CLEAR_STATE,
} from '../constants/get-tiles'

import { HTTP } from 'helpers'

export const getTiles = (page, typeBy, sortBy, orderBy) => {
	return async dispatch => {
		dispatch({
			type: GET_TILES_LOADING,
		})

		try {
			const response = await HTTP.getTiles({
				page,
				typeBy,
				sortBy,
				orderBy
			})
			return dispatch({
				type: GET_TILES_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)
			
			return dispatch({
				type: GET_TILES_ERROR,
			})
		}
	}
}

export const getPopularTiles = () => {
	return async dispatch => {
		dispatch({
			type: GET_POPULAR_TILES_LOADING,
		})

		try {
			const response = await HTTP.getPopularTiles()
			return dispatch({
				type: GET_POPULAR_TILES_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: GET_POPULAR_TILES_ERROR,
			})
		}
	}
}

export const clear = () => ({
	type: CLEAR_STATE,
})