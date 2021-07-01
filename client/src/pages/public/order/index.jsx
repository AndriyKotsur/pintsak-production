import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart-action'

import { Cart, Icon, Title, Form, Input } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const OrderPage = () => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(CartActions.orderCartItems(cart))
	}

	return (
		<div className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.form}>
						<Title value="Відправити замовлення" />
						<p className={s.form_text}>Будь ласка, заповніть обов'язкові поля і ми зв'яжемося з вами повашому замовленню</p>
						<Form handler={handleSubmit} required>
							<Input
								type='text'
								name='name'
								title='Ваше Ім’я*'
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
							<Input
								type='text'
								name='phone'
								title='Ваше номер телефону*'
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
							<Input
								type='text'
								name='message'
								title='Ваш комментар'
								onChange={e => dispatch(CartActions.handleChange(e))}
								required />
						</Form>
					</div>
					<div className={s.order}>
						<div className={s.edit} onClick={() => dispatch(CartActions.handleCart(true))}>
							<span className={s.edit_title}>Редагувати замовлення</span>
							<button type="button" className={s.edit_btn}>
								<Icon name="arrow" className={classNames('icon', 'icon-arrow', s.edit_icon)}/>
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
									<div key={'item_'+ index} className={s.list_item}>
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
			{ cart.is_active && <Cart /> }
		</div>
	)
}

export default OrderPage
