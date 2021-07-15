import {
	EDIT_TYPE_SUCCESS,
	EDIT_TYPE_ERROR,
	EDIT_TYPE_LOADING,
	GET_TYPE_SUCCESS,
	GET_TYPE_ERROR,
	GET_TYPE_LOADING,
	CHANGE_EDIT_TYPE_STATE,
	CLEAR_EDIT_TYPE_STATE,
} from '../constants/edit-type'

import {
	HTTP,
} from 'helpers'

export const editType = (id, { title }) => {
	return async dispatch => {
		dispatch({
			type: EDIT_TYPE_LOADING,
		})

		try {
			await HTTP.updateType({ id, title })

			return dispatch({
				type: EDIT_TYPE_SUCCESS,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: EDIT_TYPE_ERROR,
			})
		}
	}
}

export const getType = id => {
	return async dispatch => {
		dispatch({
			type: GET_TYPE_LOADING,
		})

		try {
			const response = await HTTP.getType(id)

			return dispatch({
				type: GET_TYPE_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: GET_TYPE_ERROR,
			})
		}
	}
}

export const handleChange = event => {
	if (event.target) {
		return {
			type: CHANGE_EDIT_TYPE_STATE,
			form: {
				[event.target.name]: event.target.value,
			},
		}
	}
}

export const clear = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_EDIT_TYPE_STATE,
		})	
	}
}