import {
	ADD_TILE_SUCCESS,
	ADD_TILE_ERROR,
	ADD_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_ADD_TILE_COLOR,
	CHANGE_ADD_TILE_STATE,
	CHANGE_CURRENT_STEP,
	CLEAR_ADD_TILE_STATE,
} from 'constants/add-tile'

import {
	HTTP,
} from 'helpers'

export const addTile = ({
	types,
	images,
	title,
	type,
	prices,
	sizes,
	is_popular,
	is_available,
}) => {
	return async dispatch => {
		dispatch({
			type: ADD_TILE_LOADING,
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

			const tile = await HTTP.addTile(data)

			if (tile.success) {
				const formData = new FormData()

				const folderType = types.find(el => el._id === type)
				formData.append('folderName', folderType.url)

				for (let i = 0; i < images.length; i++)
					formData.append('images', images[i])

				formData.append('url', tile.data.url)

				await HTTP.uploadImages({ id: tile.data._id, formData })

				return dispatch({
					type: ADD_TILE_SUCCESS,
				})
			} else {
				return dispatch({
					type: ADD_TILE_ERROR,
				})
			}
		} catch (err) {
			console.error(err)

			return dispatch({
				type: ADD_TILE_ERROR,
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

export const handleChangeColor = color => {
	return dispatch => {
		return dispatch({
			type: CHANGE_ADD_TILE_COLOR,
			payload: color
		})
	}
}

export const handleChange = (event, field) => {
	if (event.target) {
		if (field) {
			return {
				type: CHANGE_ADD_TILE_STATE,
				field: field,
				form: {
					[field]: {
						[event.target.name]: event.target.value,
					},
				},
			}
		} else {
			return {
				type: CHANGE_ADD_TILE_STATE,
				form: {
					[event.target.name]: event.target.hasOwnProperty('checked') ? event.target.checked : event.target.value,
				},
			}
		}
	} else {
		return {
			type: CHANGE_ADD_TILE_STATE,
			form: {
				images: event,
			},
		}
	}
}

export const handleChangeCurrentStep = step => {
	return dispatch => {
		dispatch({
			type: CHANGE_CURRENT_STEP,
			payload: step
		})
	}
}

export const clear = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ADD_TILE_STATE,
		})
	}
}