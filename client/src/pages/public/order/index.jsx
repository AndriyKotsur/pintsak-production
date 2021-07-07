import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart.action'

import { Cart, Form, Icon, Input, Preloader, Popup, Title } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const OrderPage = () => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	const message = {
		'error': 'Помилка. Ваш запит не був відправлений, заповніть обов\'язкові поля, щоб відправити замовлення!',
		'success': 'Дякуємо. Ваше запит був успішно відправлений, ми зв\'яжемося з вами найближчим часом!'
	}

	const handleReset = () => {
		// Navigate to the shop page after successfull order
		if(cart.order_cart_items_status === 'success') {
			dispatch(CartActions.clear())
			window.location = '/catalogue'
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(CartActions.orderCartItems(cart))
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(CartActions.clearOrder())
		}, 5000)
	}

	return (
		<div className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.form}>
						<Title value="Відправити замовлення" />
						<p className={s.form_text}>
							Будь ласка, заповніть обов'язкові поля і ми зв'яжемося з вами повашому замовленню
						</p>
						<Form handler={handleSubmit} required>
							<Input
								type='text'
								name='name'
								title='Ваше Ім’я*'
								value={cart.order.name}
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
							<Input
								type='text'
								name='phone'
								title='Ваше номер телефону*'
								value={cart.order.phone}
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
							<Input
								type='text'
								name='message'
								title='Ваш комментар'
								value={cart.order.message}
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
						</Form>
					</div>
					<div className={s.order}>
						<div className={s.edit} onClick={() => dispatch(CartActions.handleCart(true))}>
							<span className={s.edit_title}>Редагувати замовлення</span>
							<button type="button" className={s.edit_btn}>
								<Icon name="arrow" className={classNames('icon', 'icon-arrow', s.edit_icon)} />
							</button>
						</div>
						<div className={s.summary}>
							<h2 className={s.summary_title}>Замовлення</h2>
							<div className={s.summary_box}>
								<span className={s.summary_text}>Підсумок:</span>
								<span className={s.summary_price}>{cart.subtotal} грн</span>
							</div>
						</div>
						<div className={s.list}>
							{
								cart.items.length > 0 && cart.items.map((item, index) => (
									<div key={'item_' + index} className={s.list_item}>
										<picture className={s.list_image}>
											<img src={item.image} alt={item.title} />
										</picture>
										<Link to={`/catalogue/${item.type.url}/${item.url}`} className={s.list_title}>{item.title}</Link>
										<span className={s.list_size}>{item.quantity} м<sup>2</sup></span>
										<span className={s.list_price}>{item.quantity * item.price},00 грн</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
			{cart.is_active && <Cart />}
			{cart.order_cart_items_status === 'loading' && <Preloader background />}
			{(cart.order_cart_items_status === 'error' || cart.order_cart_items_status === 'success') &&
				<Popup
				message={message[cart.order_cart_items_status]}
				status={cart.order_cart_items_status} 
				handleReset={handleReset} />}
		</div>
	)
}

export default OrderPage
