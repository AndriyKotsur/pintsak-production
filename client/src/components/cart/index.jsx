import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLockBodyScroll } from 'hooks'
import * as CartActions from 'actions/cart.action'

import { Button, Counter, Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Cart = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const cart = useSelector(state => state.cart)
	const { items } = cart
	
	useLockBodyScroll()

	const handleButton = () => {
		dispatch(CartActions.handleCart(false))
		history.push('/order')
	}
	
	return (
		<section className={s.cart}>
			<div className={s.cart_wrapper}>
				<div className={s.cart_header}>
					<h2 className={s.header_title}>
						Товари в кошику
					</h2>
					<button
						type="button"
						onClick={() => dispatch(CartActions.handleCart(false))}
						className={s.header_close}>
						<Icon name="close" className="icon icon-close--big" />
					</button>
				</div>
				{ items && items.length > 0 &&
					<div className={s.cart_description}>
						<span className={s.description_item}>
							Кількість
						</span>
						<span className={s.description_item}>
							Ціна, грн
						</span>
						<span className={s.description_item}>
							Сума, грн
						</span>
					</div> }
				<div className={s.cart_list}>
					{ items && items.length > 0 ? items.map((item, index) => (
						<div key={index} className={s.cart_item}>
							<div className={s.item_wrapper}>
								<button type="button"
									onClick={() => dispatch(CartActions.deleteCartItem(item._id))}
									className={s.item_close}>
									<Icon name="close" className="icon icon-close--small" />
								</button>
								<picture className={s.item_image}>
									<img src={item.image} alt={item.title} />
								</picture>
								<div className={s.item_text}>
									<Link to={`/${item.type.url}`}
										className={s.item_type}>{item.type.title}</Link>
									<Link to={`/${item.type.url}/${item.url}`}
										className={s.item_title}>{item.title}</Link>
								</div>
							</div>
							<div className={s.item_total}>
								<Counter id={item._id} type="cart" measurement={item.measurement} quantity={item.quantity} />
								<div className={s.item_cost}>
									<span className={s.item_price}>
										{item.price},<sup>00</sup>
									</span>
									<span className={s.item_summary}>
										{item.price * item.quantity},<sup>00</sup>
									</span>
								</div>
							</div>
						</div>
					))
					: 
					<div className={s.cart_empty}>
						<Icon name='empty' className={s.empty_icon} />
						<span className={s.empty_title}>
							Немає товарів в корзині
						</span>
					</div> }
				</div>
				{ items && items.length > 0 &&
					<div className={s.cart_order}>
						<div className={s.order_back} onClick={() => dispatch(CartActions.handleCart(false))}>
							<span className={s.back_title}>
								Продовжити покупки
							</span>
							<button className={s.back_button}>
								<Icon name="arrow" className={classNames('icon', 'icon-arrow', s.back_icon)} />
							</button>
						</div>
						<div className={s.order_total}>
							<div className={s.order_cost}>
								<span className={s.order_total}>
									Підсумок
								</span>
								<span className={s.order_summary}>
									{cart.subtotal},<sup>00 грн</sup>
								</span>
							</div>
							<Button
								type="button"
								background="orange"
								styleName={s.order_button}
								handleClick={handleButton}>
								Замовити
							</Button>
						</div>
					</div> }
			</div>
		</section>
	)
}

export default Cart
