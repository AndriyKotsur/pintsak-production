import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart-action'

import classNames from 'classnames'
import s from './style.module.scss'

const Counter = ({ id, type, quantity, handleQuantity }) => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	return (
		<div className={classNames(s.wrapper, { [s.cart]: type === 'cart', [s.catalogue]: type === 'catalogue' }) }>
			<button className={classNames(s.remove, { [s.disabled]: quantity <= 1 }) } onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'minus')) : handleQuantity(quantity - 1)} disabled={quantity <= 1}>
				<span className={s.minus}></span>
			</button>
			<div className={s.count}>{quantity}{ type === 'catalogue' && <span>м<sup>2</sup></span>}</div>
			<button className={s.add} onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'plus')) : handleQuantity(quantity + 1)}>
				<span className={s.plus}></span>
			</button>
			{ type === 'product' && <span className={s.size}>м<sup>2</sup></span> }
		</div>
	)
}

export default Counter
