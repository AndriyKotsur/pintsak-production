import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const Cart = () => {
	const [visible, setVisible] = useState(false)

	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}>
			<Icon name="shopping" className={classNames('icon', 'icon-cart', s.icon)} />
			<span className={s.count}>(0)</span>
			<div className={classNames(s.cart, {[s.visible]: visible})}>
				<h3 className={s.title}>В кошику 1 товар на суму:</h3>
				<p className={s.price}>198,<sup>00</sup> грн</p>
				<button className={s.btn}>Замовити</button>
				<Link to="/cart" className={s.link}>Перейти в кошик
					<Icon name="arrow" className="icon icon-arrow" />
				</Link>
			</div>
		</div>
	)
}

export default Cart