import {
    GET_POPULAR_TILES_SUCCESS,
    GET_POPULAR_TILES_ERROR,
    GET_POPULAR_TILES_LOADING,
    CLEAR_STATE,
} from "../constants/get-popular-tiles"

let initialState = {
    tiles: [],
    get_popular_tile_status: '',
}

export default function getPopularTiles(state = initialState, action) {
    switch (action.type) {
        case GET_POPULAR_TILES_SUCCESS:
                return {
                    ...state,
                    tiles: action.payload,
                    get_popular_tile_status: 'success',
                }
        case GET_POPULAR_TILES_ERROR:
                return {
                    ...state,
                    get_popular_tile_status: 'error',
                }
        case GET_POPULAR_TILES_LOADING:
                return {
                    ...state,
                    get_popular_tile_status: 'loading',
                }
        case CLEAR_STATE:
                return {
                    ...initialState,
                }
        default:
            return state
    }
}
