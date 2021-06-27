import {
  GET_TILE_SUCCESS,
  GET_TILE_ERROR,
  GET_TILE_LOADING,
  CLEAR_STATE,
} from '../constants/get-tile'

let initialState = {
  tiles: [],
  title: '',
  url: '',
  type: {},
  images: [],
  sizes: {
    width: '',
    height: '',
    thickness: '',
    weight: '',
    pieces: '',
    measurement: '',
  },
  prices: {},
  is_popular: false,
  is_available: false,
  get_tile_status: '',
}

export default function getTile(state = initialState, action) {
  switch (action.type) {
    case GET_TILE_SUCCESS:
      return {
        ...state,
        ...action.payload.tile,
          tiles: action.payload.tiles,
          get_tile_status: 'success',
      }
    case GET_TILE_ERROR:
      return {
        ...state,
        get_tile_status: 'error',
      }
    case GET_TILE_LOADING:
      return {
        ...state,
        get_tile_status: 'loading',
      }
    case CLEAR_STATE:
      return {
        ...initialState,
      }
      default:
        return state
  }
}