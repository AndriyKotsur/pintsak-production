import ActionTypes from './action-types';

export function setUser (token) {
    return {
        type: ActionTypes.SET_USER,
        payload: {
            token
        }
    }
};

export function unSetUser () {
    return {
        type: ActionTypes.UNSET_USER
    }
};

export function getUser () {
    return {
        type: ActionTypes.GET_USER
    }
};