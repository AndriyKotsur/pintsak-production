import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart.action'

import classNames from 'classnames'
import s from './style.module.scss'

const Counter = ({
	id,
	disabled,
	measurement,
	type,
	quantity,
	handleQuantity
}) => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	let classes = {
		[s.cart]: type === 'cart',
		[s.catalogue]: type === 'catalogue'
	}

	const measurements = useMemo(() => {
		const units = {
			'Штука': <span className={classNames({ [s.counter_size]: type === 'product' })}>шт.</span>,
			'Квадратний метр': <span className={classNames({ [s.counter_size]: type === 'product' })}>м<sup>2</sup></span>
		}

		return units[measurement]
	}, [measurement, type])

	return (
		<div className={classNames(s.counter, classes)}>
			<button
				className={classNames(s.counter_remove, { [s.disabled]: quantity <= 1 || disabled })}
				onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'minus')) : handleQuantity(quantity - 1)}
				disabled={quantity <= 1}>
				<span className={s.counter_minus}></span>
			</button>
			<div className={s.counter_quantity}>
				{quantity}
				{['catalogue', 'cart'].includes(type) && measurements}
			</div>
			<button
				className={classNames(s.counter_add, { [s.disabled]: disabled })}
				onClick={() => cart.is_active ? dispatch(CartActions.editCartItem(id, 'plus')) : handleQuantity(quantity + 1)}>
				<span className={s.counter_plus}></span>
			</button>
			{type === 'product' && measurements}
		</div>
	)
}

Counter.propTypes = {
	id: PropTypes.string,
	disabled: PropTypes.any,
	measurement: PropTypes.string,
  type: PropTypes.string,
  quantity: PropTypes.number,
  handleQuantity: PropTypes.any
}

Counter.defaultProps = {
	id: '',
	disabled: false,
  measurement: '',
  type: '',
	quantity: null,
  handleQuantity: () => null
}
export default Counter
