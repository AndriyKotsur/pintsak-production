import React from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.scss'

const Cart =()=> {
	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>В кошику 1 товар на суму:</h3>
			<p className={s.price}>198,<sup>00</sup> грн</p>
			<button className={s.btn}>Замовити</button>
			<Link to="/cart" className={s.link}>Перейти в кошик
				<svg className="icon icon-arrow--cart">
					<use href="images/icons/sprite.svg#arrow-cart"></use>
				</svg>
			</Link>
		</div>
	)
}

export default Cart