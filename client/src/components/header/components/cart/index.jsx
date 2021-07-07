import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart.action'

import { Icon, Cart } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const DropdownCart = () => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)

	const cart = useSelector(cart => cart.cart)
	const { is_active, items, subtotal } = cart

	useEffect(() => {
		dispatch(CartActions.getCartItems())
	}, [dispatch])

	useEffect(() => {
		if (is_active) setVisible(false)
	}, [is_active])

	return (
		<div
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			className={s.wrapper}>
			<Icon name="shopping" className={classNames('icon', 'icon-cart', s.icon)} />
			<span className={s.count}>({items.length})</span>
			<div className={classNames(s.cart, { [s.visible]: visible })}>
				{items.length > 0 ?
					<div className={s.container}>
						<h3 className={s.title}>В кошику {items.length} товар на суму:</h3>
						<p className={s.price}>{subtotal},<sup>00</sup> грн</p>
						<Link to="/order" className={s.btn}>Замовити</Link>
						<button
							type="button"
							onClick={() => dispatch(CartActions.handleCart(true))}
							className={s.link}>Перейти в кошик
							<Icon name="arrow" className={classNames('icon', 'icon-arrow', s.arrow)} />
						</button>
					</div>
					:
					<div className={s.container}>
						<Icon name="cart" className={s.empty} />
						<h3 className={s.title}>Корзина порожня :(</h3>
					</div>}
			</div>
			{cart.is_active && <Cart />}
		</div>
	)
}

export default DropdownCart
