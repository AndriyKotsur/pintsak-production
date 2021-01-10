import {
	ADD_TILE_SUCCESS,
	ADD_TILE_ERROR,
	ADD_TILE_LOADING,
	GET_TILE_TYPES_SUCCESS,
	GET_TILE_TYPES_LOADING,
	GET_TILE_TYPES_ERROR,
	CHANGE_STATE,
	CLEAR_STATE,
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
				payload: response,
			})
		} catch (err) {
			return dispatch({
				type: GET_TILE_TYPES_ERROR,
			})
		}
	}
}

export const addTile = ({
	types,
	images,
	url,
	title,
	type,
	width,
	height,
	thickness,
	weight_per_meter,
	pieces_per_meter,
	is_popular,
	is_available,
	grey,
	yellow,
	orange,
	red,
	brown,
	black,
}) => {
	return async dispatch => {
		dispatch({
			type: ADD_TILE_LOADING,
		})
		try {
			const formData = new FormData()
			types.forEach(item => {
				if (item.title === type)
					formData.append('folderName', item.url)
			})

			formData.append('url', url.toLowerCase())
			formData.append('title', title)
			formData.append('type', type)
			formData.append('width', width)
			formData.append('height', height)
			formData.append('thickness', thickness)
			formData.append('weight_per_meter', weight_per_meter)
			formData.append('pieces_per_meter', pieces_per_meter)
			formData.append('is_popular', is_popular)
			formData.append('is_available', is_available)

			const color_price = {
				grey,
				yellow,
				orange,
				red,
				brown,
				black,
			}
			formData.append('color_price', JSON.stringify(color_price))
			for (let i = 0; i < images.length; i++)
				formData.append('images', images[i])

			await HTTP.addTile(formData)
			return dispatch({
				type: ADD_TILE_SUCCESS,
			})
		} catch (err) {
			return dispatch({
				type: ADD_TILE_ERROR,
			})
		}
	}
}

export const handleChange = event => {
	if (event.target) {
		return {
			type: CHANGE_STATE,
			form: {
				[event.target.name]: event.target.value ? event.target.value : event.target.checked,
			},
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

export const clear = () => ({
	type: CLEAR_STATE,
})