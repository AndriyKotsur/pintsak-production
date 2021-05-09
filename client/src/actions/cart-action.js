import {
	ORDER_CART_ITEMS_SUCCESS,
	ORDER_CART_ITEMS_ERROR,
	ORDER_CART_ITEMS_LOADING,
	GET_CART_ITEMS,
	ADD_CART_ITEM,
	EDIT_CART_ITEM,
	DELETE_CART_ITEM,
	HANDLE_CART,
} from '../constants/cart'

import {
	HTTP,
} from 'helpers'

export const handleCart = handler => {
	return dispatch => {
		dispatch({
			type: HANDLE_CART,
			payload: handler,
		})
	}
}

export const orderCartItems = () => {
	return async dispatch => {
		dispatch({
			type: ORDER_CART_ITEMS_LOADING,
		})

		try {
			const cartItems = JSON.parse(localStorage.getItem('cart_items'))
			if (cartItems) await HTTP.sendOrder(cartItems)

			return dispatch({
				type: ORDER_CART_ITEMS_SUCCESS,
			})
		} catch (err) {
			return dispatch({
				type: ORDER_CART_ITEMS_ERROR,
			})
		}
	}
}

export const getCartItems = () => {
	return dispatch => {
		const items = JSON.parse(localStorage.getItem('cart_items')) || []
		const subtotal = localStorage.getItem('cart_subtotal') || 0

		dispatch({
			type: GET_CART_ITEMS,
			payload: {
				items,
				subtotal,
			},
		})
	}
}

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
			price: item.prices[variant],
		}
		const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const subtotal = newItem.quantity * Number(newItem.price)

		localStorage.setItem('cart_items', JSON.stringify([...cartItems, newItem]))
		localStorage.setItem('cart_subtotal', Number(cartSubtotal) + subtotal)

		dispatch({
			type: ADD_CART_ITEM,
			payload: {
				item: newItem,
				subtotal: subtotal,
			},
		})
	}
}

export const deleteCartItem = id => {
	return dispatch => {
		const cartItems = JSON.parse(localStorage.getItem('cart_items'))
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const items = cartItems.filter(element => element._id !== id)
		const deletedItem = cartItems.find(element => element._id === id)

		const total = deletedItem.quantity * Number(deletedItem.price)

		localStorage.setItem('cart_items', JSON.stringify(items))
		localStorage.setItem('cart_subtotal', Number(cartSubtotal) - total)

		dispatch({
			type: DELETE_CART_ITEM,
			payload: {
				items,
				subtotal: total,
			},
		})
	}
}

export const editCartItem = (id, operator) => {
	return dispatch => {
		const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
		const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

		const editedCartItem = cartItems.find(element => element._id === id)

		if(editedCartItem) {
			const total = operator === 'plus' ? Number(cartSubtotal) + editedCartItem.price : Number(cartSubtotal) - editedCartItem.price
			editedCartItem.quantity = operator === 'plus' ? Number(editedCartItem.quantity) + 1  : Number(editedCartItem.quantity) - 1

			const editedItems = [...cartItems.filter(item => item._id !== id), editedCartItem]

			localStorage.setItem('cart_items', JSON.stringify(editedItems))
			localStorage.setItem('cart_subtotal', Number(total))

			dispatch({
				type: EDIT_CART_ITEM,
				payload: {
					subtotal: total,
					items: editedItems,
				},
			})
		}
	}
}
