import {
	ADD_TILE_SUCCESS,
	ADD_TILE_ERROR,
	ADD_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_STATE,
	CLEAR_STATE,
	CHANGE_COLOR,
	CHANGE_STEP,
} from 'constants/add-tile'
import {
	HTTP,
} from 'helpers'

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

export const handleChangeColor = color => {
	return {
		type: CHANGE_COLOR,
		payload: color
	}
}

export const handleChange = (event, field) => {
	if (event.target) {
		if (field) {
			return {
				type: CHANGE_STATE,
				field: field,
				form: {
					[field]: {
						[event.target.name]: event.target.value,
					},
				},
			}
		} else {
			return {
				type: CHANGE_STATE,
				form: {
					[event.target.name]: event.target.hasOwnProperty('checked') ? event.target.checked : event.target.value,
				},
			}
		}
	} else {
		return {
			type: CHANGE_STATE,
			form: {
				images: event,
			},
		}
	}
}

export const changeStep = currentStep => {
	return dispatch => {
		return dispatch({ type: CHANGE_STEP, payload: currentStep })
	}
}

export const clear = () => ({
	type: CLEAR_STATE,
})