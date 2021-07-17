import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart.action'

import { useOnClickOutside } from 'hooks'

import { Icon, Button, Cart } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const DropdownCart = () => {
	const [active, setActive] = useState(false)

	const dispatch = useDispatch()
	const cart = useSelector(cart => cart.cart)
	const { items, subtotal } = cart

	const dropdownRef = useRef()

	useOnClickOutside(dropdownRef, () => setActive(false))

	const handleActiveCart = () => {
		setActive(false)
		dispatch(CartActions.handleCart(true))
	}

	useEffect(() => {
		dispatch(CartActions.getCartItems())
	}, [dispatch])

	return (
		<div
			ref={dropdownRef}
			className={classNames(s.cart, {[s.active]: active})}
			onClick={() => setActive(prev => !prev)}>
			<Icon name='shopping' className={classNames('icon', 'icon-cart', s.cart_icon)} />
			<span className={s.cart_count}>
				({items.length})
			</span>
			<div className={s.cart_wrapper}>
				{items && items.length > 0 ?
					<div className={s.cart_container}>
						<h3 className={s.cart_title}>
							В кошику {items.length} товар на суму:
						</h3>
						<p className={s.cart_price}>
							{subtotal},<sup>00</sup> грн
						</p>
						<Link to='/order'>
							<Button
								type='button'
								background='orange'
								styleName={s.cart_btn}>
								Замовити
							</Button>
						</Link>
						<Button
							type='button'
							background='transparent'
							styleName={s.cart_link}
							handleClick={handleActiveCart}>
								Перейти в кошик
								<Icon name='arrow' className={classNames('icon', 'icon-arrow', s.cart_arrow)} />
						</Button>
					</div>
					:
					<div className={s.cart_container}>
						<Icon name='empty' className={s.cart_empty} />
						<h3 className={s.cart_title}>
							Корзина порожня
						</h3>
					</div>}
			</div>
			{cart.is_active && <Cart />}
		</div>
	)
}

export default DropdownCart
