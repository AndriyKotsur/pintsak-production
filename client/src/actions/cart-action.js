import {
    ORDER_CART_ITEMS_SUCCESS,
    ORDER_CART_ITEMS_ERROR,
    ORDER_CART_ITEMS_LOADING,
    GET_CART_ITEMS,
    ADD_CART_ITEM,
    EDIT_CART_ITEM,
    DELETE_CART_ITEM,
    CLEAR_STATE,
} from '../constants/cart'

import {
    HTTP,
} from 'helpers'

export const orderCartItems = () => {
    return async dispatch => {
        dispatch({
            type: ORDER_CART_ITEMS_LOADING
        })

        try {
            const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
            if(cartItems) await HTTP.sendOrder(cartItems)

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
        const cartItems = localStorage.getItem('cart_items')
        const cartSubtotal = localStorage.getItem('cart_subtotal')

        dispatch({
            type: GET_CART_ITEMS,
            payload: {
                items: cartItems,
                subtotal: cartSubtotal,
            }
        })
    }
}

export const addCartItem = (item, quantity, variant) => {
    return dispatch => {
        const newItem = {
            ...item,
            quantity: quantity,
            variant: variant,
            price: item.prices[variant],
        }
        const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
        const cartSubtotal = localStorage.getItem('cart_subtotal') || 0
        const subtotal = newItem.quantity * newItem.price

        localStorage.setItem('cart_items', JSON.stringify([...cartItems, newItem]))
        localStorage.setItem('cart_subtotal', Number(cartSubtotal) + subtotal)

        dispatch({
            type: ADD_CART_ITEM,
            payload: {
                item: newItem,
                subtotal: subtotal,
            }
        })
    }
}

export const deleteCartItem = (item, quantity) => {
    return dispatch => {
        const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
        const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

        const items = cartItems.filter(element => element._id !== item.id)
        const subtotal = cartItems.find(element => element._id === item.id).prices[0]
        const total = subtotal * quantity

        localStorage.setItem('cart_items', JSON.stringify(items))
        localStorage.setItem(('cart_subtotal', Number(cartSubtotal) - total))

        dispatch({
            type: DELETE_CART_ITEM,
            item: items,
            subtotal: total,
        })
    }
}

export const editCartItem = (item, operator) => {
    return dispatch => {
        const cartItems = JSON.parse(localStorage.getItem('cart_items')) || []
        const cartSubtotal = localStorage.getItem('cart_subtotal') || 0

        const subtotal = cartItems.find(element => element._id === item.id).prices[0]
        const total = operator === 'plus' ? cartSubtotal + subtotal : cartSubtotal - subtotal

        localStorage.setItem('cart_subtotal', total)

        dispatch({
            type: EDIT_CART_ITEM,
            subtotal: total,
        })
    }
}

export const clear = () => ({
    type: CLEAR_STATE,
})