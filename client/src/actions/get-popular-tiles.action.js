import {
    GET_POPULAR_TILES_SUCCESS,
    GET_POPULAR_TILES_ERROR,
    GET_POPULAR_TILES_LOADING,
    CLEAR_STATE,
} from "../constants/get-popular-tiles"

import {
    HTTP,
} from "helpers"

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
            return dispatch({
                type: GET_POPULAR_TILES_ERROR,
            })
        }
    }
}

export const clear = () => ({
    type: CLEAR_STATE,
})
