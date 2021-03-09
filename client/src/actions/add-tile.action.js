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
				payload: response.data,
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
			const color_price = { grey, yellow, orange, red, brown, black }

			const data = {
				title,
				type,
				width,
				height,
				thickness,
				weight_per_meter,
				pieces_per_meter,
				color_price,
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
				formData.append('url', tile.url)

				await HTTP.uploadImages({ id: tile._id, formData })
				
				return dispatch({
					type: ADD_TILE_SUCCESS,
				})
			} else {
				return dispatch({
					type: ADD_TILE_ERROR,
				})
			}
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
				[event.target.name]: event.target.checked ? event.target.checked : event.target.value,
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