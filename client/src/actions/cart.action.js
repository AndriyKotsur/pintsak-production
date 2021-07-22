import {
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_ERROR,
	ORDER_CART_ITEMS_LOADING,
	GET_CART_ITEMS,
	ADD_CART_ITEM,
	EDIT_CART_ITEM,
	DELETE_CART_ITEM,
	HANDLE_CART,
	CHANGE_CART_STATE,
	CLEAR_CART_ORDER,
	CLEAR_CART_STATE,
} from '../constants/cart'

import {
	HTTP,
} from 'helpers'

export const addCartItem = (item, quantity, variant) => {
	return dispatch => {
		const newItem = {
			quantity,
			variant,
			_id: item._id,
			title: item.title,
			type: item.type,
			url: item.url,
			image: item.images[0],
			measurement: item.sizes.measurement,
			price: item.prices[variant],
		}

		const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const newSubtotal = Number(newItem.quantity) * Number(newItem.price)

		localStorage.setItem('cart_items', JSON.stringify([...cartItems, newItem]))
		localStorage.setItem('cart_subtotal', Number(cartSubtotal) + Number(newSubtotal))

		dispatch({
			type: ADD_CART_ITEM,
			payload: {
				item: newItem,
				subtotal: newSubtotal,
			},
		})
	}
}

export const deleteCartItem = id => {
	return dispatch => {
		const cartItems = JSON.parse(localStorage.getItem('cart_items'))
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const deletedItems = cartItems.filter(element => element._id !== id)
		const deletedItem = cartItems.find(element => element._id === id)

		const newSubtotal = Number(deletedItem.quantity) * Number(deletedItem.price)

		localStorage.setItem('cart_items', JSON.stringify(deletedItems))
		localStorage.setItem('cart_subtotal', Number(cartSubtotal) - Number(newSubtotal))

		dispatch({
			type: DELETE_CART_ITEM,
			payload: {
				items: deletedItems,
				subtotal: newSubtotal,
			},
		})
	}
}

export const editCartItem = (id, operator) => {
	return dispatch => {
		const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const editedCartItem = cartItems.find(element => element._id === id)

		if (editedCartItem) {
			const newSubtotal = operator === 'plus' ? Number(cartSubtotal) + Number(editedCartItem.price) : Number(cartSubtotal) - Number(editedCartItem.price)
			editedCartItem.quantity = operator === 'plus' ? Number(editedCartItem.quantity) + 1 : Number(editedCartItem.quantity) - 1

			const editedItems = [...cartItems.filter(item => item._id !== id), editedCartItem]

			localStorage.setItem('cart_items', JSON.stringify(editedItems))
			localStorage.setItem('cart_subtotal', Number(newSubtotal))

			dispatch({
				type: EDIT_CART_ITEM,
				payload: {
					subtotal: newSubtotal,
					items: editedItems,
				},
			})
		}
	}
}

export const getCartItems = () => {
	return dispatch => {
		const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0
		const newSubtotal = Number(cartSubtotal)

		dispatch({
			type: GET_CART_ITEMS,
			payload: {
				items: cartItems,
				subtotal: newSubtotal,
			},
		})
	}
}

export const orderCartItems = ({ order }) => {
	return async dispatch => {
		dispatch({
			type: ORDER_CART_ITEMS_LOADING,
		})

		try {
			const cartItems = JSON.parse(localStorage.getItem('cart_items'))
			if (cartItems) await HTTP.sendOrder({
				order: cartItems,
				...order,
			})

			return dispatch({
				type: ORDER_CART_ITEMS_SUCCESS,
			})
		} catch (err) {
			console.error(err)
			return dispatch({
				type: ORDER_CART_ITEMS_ERROR,
			})
		}
	}
}

export const handleCart = handler => {
	return dispatch => {
		dispatch({
			type: HANDLE_CART,
			payload: handler,
		})
	}
}

export const handleChange = (event) => {
	return dispatch => {
		dispatch({
			type: CHANGE_CART_STATE,
			payload: event
		})
	}
}

export const clearOrder = () => {
	localStorage.setItem('cart_items', JSON.stringify([]))
	localStorage.setItem('cart_subtotal', 0)

	return dispatch => {
		dispatch({
			type: CLEAR_CART_ORDER,
		})
	}
}

export const clear = () => {
	localStorage.setItem('cart_items', JSON.stringify([]))
	localStorage.setItem('cart_subtotal', 0)

	return dispatch => {
		dispatch({
			type: CLEAR_CART_STATE,
		})
	}
}
