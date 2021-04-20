import {
	HANDLE_CART,
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_ERROR,
	ORDER_CART_ITEMS_LOADING,
	GET_CART_ITEMS,
	ADD_CART_ITEM,
	EDIT_CART_ITEM,
	DELETE_CART_ITEM,
} from '../constants/cart'

let initialState = {
	is_active: false,
	items: [],
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
	default:
		return state
	}
}
