import {
	HANDLE_CART,
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_ERROR,
	ORDER_CART_ITEMS_LOADING,
	GET_CART_ITEMS,
	ADD_CART_ITEM,
	EDIT_CART_ITEM,
	DELETE_CART_ITEM,
	CHANGE_CART_STATE,
	CLEAR_CART_ORDER,
	CLEAR_CART_STATE,
} from '../constants/cart'

let initialState = {
	is_active: false,
	items: [],
	order: {
		name: '',
		phone: '',
		message: ''
	},
	subtotal: null,
	order_cart_items_status: '',
}

export default function cart(state = initialState, { type, payload }) {
	switch (type) {
		case HANDLE_CART:
			return {
				...state,
				is_active: payload,
			}
		case ORDER_CART_ITEMS_SUCCESS:
			return {
				...state,
				order_cart_items_status: 'success',
			}
		case ORDER_CART_ITEMS_ERROR:
			return {
				...state,
				order_cart_items_status: 'error',
			}
		case ORDER_CART_ITEMS_LOADING:
			return {
				...state,
				order_cart_items_status: 'loading',
			}
		case GET_CART_ITEMS:
			return {
				...state,
				subtotal: payload.subtotal,
				items: payload.items,
			}
		case ADD_CART_ITEM:
			return {
				...state,
				subtotal: state.subtotal + payload.subtotal,
				items: [...state.items, payload.item],
			}
		case DELETE_CART_ITEM:
			return {
				...state,
				subtotal: state.subtotal - payload.subtotal,
				items: payload.items,
			}
		case EDIT_CART_ITEM:
			return {
				...state,
				subtotal: payload.subtotal,
				items: payload.items,
			}
		case CHANGE_CART_STATE:
			if (payload) {
				return {
					...state,
					order: {
						...state.order,
						[payload.target.name]: payload.target.value
					}
				}
			} else {
				return state
			}
		case CLEAR_CART_ORDER:
			return {
				...state,
				order: {
					name: '',
					phone: '',
					message: ''
				},
			}
		case CLEAR_CART_STATE:
			return {
				...initialState,
			}
	default:
		return state
	}
}