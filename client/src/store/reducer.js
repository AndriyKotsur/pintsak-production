import ActionTypes from './action-types';
import { COOKIES } from '../helpers'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      COOKIES.setAuthToken(action.payload.token)
      return {
        isAuth: true
      }
    case ActionTypes.UNSET_USER:
      COOKIES.removeAuthToken()
      return {
        isAuth: false
      }
    case ActionTypes.GET_USER:
      if (COOKIES.getAuthToken()) {
        return {
          isAuth: true
        }
      } else {
        return {
          isAuth: false
        }
      }
    default:
      return state;
  }
}

export default reducer;