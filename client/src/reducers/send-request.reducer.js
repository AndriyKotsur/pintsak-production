import {
  SEND_REQUEST_SUCCESS,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_LOADING,
  CHANGE_STATE,
  CLEAR_REQUEST,
  CLEAR_STATE
} from '../constants/send-request'

let initialState = {
  request: {
    name: '',
    phone: '',
    message: ''
  },
  send_request_status: ''
}

export default function sendRequest(state = initialState, { type, payload }) {
  switch(type) {
    case SEND_REQUEST_SUCCESS:
      return {
        ...state,
        send_request_status: 'success'
      }
    case SEND_REQUEST_ERROR:
      return {
        ...state,
        send_request_status: 'error'
      }
    case SEND_REQUEST_LOADING:
      return {
        ...state,
        send_request_status: 'loading'
      }
    case CHANGE_STATE:
      if(payload) {
        return {
          ...state,
          request: {
            ...state.request,
            [payload.target.name]: payload.target.value
          }
        }
      } else {
        return state
      }
    case CLEAR_REQUEST:
      return {
        ...state,
        request: {
          name: '',
          phone: '',
          message: ''
        },
      }
    case CLEAR_STATE:
      return {
        ...initialState
      }
    default:
      return state
  }
}