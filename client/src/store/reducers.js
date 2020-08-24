import ActionTypes from './action-types';

const usersReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      localStorage.setItem('token', action.payload.token)
      return {
        isAuth: true
      }
    case ActionTypes.UNSET_USER:
      localStorage.removeItem('token')
      return {
        isAuth: false
      }
    case ActionTypes.GET_USER:
      if (localStorage.getItem('token')) {
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

export default usersReducer;