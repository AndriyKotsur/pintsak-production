import {
	EDIT_TILE_SUCCESS,
	EDIT_TILE_ERROR,
	EDIT_TILE_LOADING,
	GET_TILE_SUCCESS,
	GET_TILE_ERROR,
	GET_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_ERROR,
	GET_TILE_TYPES_LOADING,
	CHANGE_EDIT_TILE_COLOR,
	DELETE_EDIT_TILE_IMAGE,
	CHANGE_EDIT_TILE_STATE,
	CHANGE_EDIT_TILE_CURRENT_STEP,
	CLEAR_EDIT_TILE_STATE,
} from '../constants/edit-tile'

import {
	HTTP,
} from 'helpers'

export const editTile = (url, {
	types,
	images,
	title,
	type,
	sizes,
	is_popular,
	is_available,
	prices,
}) => {
	return async dispatch => {
		dispatch({
			type: EDIT_TILE_LOADING,
		})

		try {
			const data = {
				title,
				type,
				sizes,
				prices,
				is_popular,
				is_available,
			}

			const response = await HTTP.updateTile(url, data)
			if (response.success) {
				const formData = new FormData()

				const typeId = typeof type === 'string' ? type : type._id
				const folderType = types.find(el => el._id === typeId)

				formData.append('folderName', folderType.url)

				for (let i = 0; i < images.length; i++)
					formData.append('images', images[i])

				formData.append('url', response.data.url)

				await HTTP.uploadImages({ id: response.data._id, formData })

				return dispatch({
					type: EDIT_TILE_SUCCESS,
				})
			} else {
				return dispatch({
					type: EDIT_TILE_ERROR,
				})
			}
		} catch (err) {
			console.error(err)

			return dispatch({
				type: EDIT_TILE_ERROR,
			})
		}
	}
}

export const getTile = id => {
	return async dispatch => {
		dispatch({
			type: GET_TILE_LOADING,
		})

		try {
			const response = await HTTP.getTile(id)

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

export const getTileTypes = () => {
	return async dispatch => {
		dispatch({
			type: GET_TILE_TYPES_LOADING,
		})

		try {
			const response = await HTTP.getTypes()

			return dispatch({
				type: GET_TILE_TYPES_SUCCESS,
				payload: response.data,
			})
		} catch (err) {
			console.error(err)

			return dispatch({
				type: GET_TILE_TYPES_ERROR,
			})
		}
	}
}

export const handleDelete = (image, id) => {
	return async dispatch => {
		try {
			const response = await HTTP.deleteImage(id, image)

			if (response.success) {
				dispatch({
					type: DELETE_EDIT_TILE_IMAGE,
					payload: image,
				})
			}
		} catch (err) {
			console.error(err)
		}
	}
}

export const handleChange = (event, field) => {
	if (event.target) {
		if (field) {
			return {
				type: CHANGE_EDIT_TILE_STATE,
				field: field,
				form: {
					[field]: {
						[event.target.name]: event.target.value,
					},
				},
			}
		} else {
			return {
				type: CHANGE_EDIT_TILE_STATE,
				form: {
					[event.target.name]: event.target.hasOwnProperty('checked') ? event.target.checked : event.target.value,
				},
			}
		}
	} else {
		return {
			type: CHANGE_EDIT_TILE_STATE,
			form: {
				images: event,
			},
		}
	}
}

export const handleChangeColor = color => {
	return dispatch => {
		dispatch({
			type: CHANGE_EDIT_TILE_COLOR,
			payload: color
		})
	}
}

export const handleChangeCurrentStep = step => {
	return dispatch => {
		dispatch({
			type: CHANGE_EDIT_TILE_CURRENT_STEP,
			payload: step
		})
	}
}

export const clear = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_EDIT_TILE_STATE,
		})	
	}
}