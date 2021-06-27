import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart-action'

import classNames from 'classnames'
import s from './style.module.scss'

const Counter = ({ id, type, disabled, measurement, quantity, handleQuantity }) => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	const measurements = useMemo(() => {
		const units = {
			'Штука': <span className={classNames({[s.size]:type === 'product'})}>шт.</span>,
			'Квадратний метр': <span className={classNames({[s.size]:type === 'product'})}>м<sup>2</sup></span>
		}

		return units[measurement]
	}, [measurement, type])

	return (
		<div className={classNames(s.wrapper,
			{ [s.cart]: type === 'cart',
				[s.catalogue]: type === 'catalogue'}) }>
			<button
				className={classNames(s.remove, { [s.disabled]: quantity <= 1 || disabled }) }
				onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'minus')) : handleQuantity(quantity - 1)}
				disabled={quantity <= 1}>
				<span className={s.minus}></span>
			</button>
			<div className={s.count}>
				{quantity}
				{['catalogue', 'cart'].includes(type) && measurements}
			</div>
			<button
				className={classNames(s.add, {[s.disabled]: disabled})}
				onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'plus')) : handleQuantity(quantity + 1)}>
				<span className={s.plus}></span>
			</button>
			{type === 'product' && measurements}
		</div>
	)
}

export default Counter
