import {
	ADD_TYPE_SUCCESS,
	ADD_TYPE_ERROR,
	ADD_TYPE_LOADING,
	CHANGE_STATE,
	CLEAR_STATE,
} from 'constants/add-type'
import { HTTP } from 'helpers'

export const addType = ({
	title,
}) => {
	return async dispatch => {
		dispatch({
			type: ADD_TYPE_LOADING,
		})
		try {
			await HTTP.addType({ title })
			return dispatch({
				type: ADD_TYPE_SUCCESS,
			})
		} catch (err) {
			console.error(err)
			return dispatch({
				type: ADD_TYPE_ERROR,
			})
		}
	}
}

export const handleChange = event => {
	if(event.target) {
		return {
			type: CHANGE_STATE,
			form: {
				[event.target.name]: event.target.value,
			},
		}
	}
}

export const clear = () => ({
	type: CLEAR_STATE,
})