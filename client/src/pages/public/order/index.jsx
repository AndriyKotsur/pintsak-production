import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as CartActions from 'actions/cart.action'
import * as Yup from 'yup'

import { Button, Icon, Input, Preloader, Popup, Title } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const OrderPage = () => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	const orderMessage = {
		'error': 'Помилка. Ваш запит не був відправлений, заповніть обов\'язкові поля, щоб відправити замовлення!',
		'success': 'Дякуємо. Ваше запит був успішно відправлений, ми зв\'яжемося з вами найближчим часом!'
	}

	const handleClear = () => {
		formik.setTouched({})
		formik.setErrors({})
	}

	const handleReset = () => {
		// Navigate to the shop page after successfull order
		if (cart.order_cart_items_status === 'success') {
			dispatch(CartActions.clear())
			window.location = '/catalogue'
		}
	}

	const handleSubmit = () => {
		dispatch(CartActions.orderCartItems(cart))
		handleClear()
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(CartActions.clearOrder())
		}, 5000)
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: ''
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.required('Поле є обов\'язковим')
				.min(2, 'Довжина поля не менше як 2 символа')
				.max(25, 'Довжина поля не більше як 25 символів'),
			phone: Yup.string()
				.required('Поле є обов\'язковим')
				.matches(/(^[+]\d+)$/, 'Введіть валідний телефонний номер')
				.min(7, 'Довжина поля не менше як 7 символа')
				.max(13, 'Довжина поля не більше як 13 символів')
		}),
		onSubmit: handleSubmit
	})

	const { errors, touched, setFieldValue } = formik

	return (
		<section className={s.order}>
			<div className='container'>
				<div className={s.order_wrapper}>
					<div className={s.order_form}>
						<Title styleName={s.form_title}>
							Відправити замовлення
						</Title>
						<p className={s.form_text}>
							Будь ласка, заповніть обов'язкові поля і ми зв'яжемося з вами повашому замовленню
						</p>
						<form onSubmit={formik.handleSubmit}>
							<Input
								type='text'
								name='name'
								value={cart.order.name}
								error={errors.name && touched.name}
								errorName={errors.name || ''}
								placeholder='Ваше Ім’я *'
								onChange={e => {
									dispatch(CartActions.handleChange(e))
									setFieldValue('name', e.target.value)
								}} />
							<Input
								type='text'
								name='phone'
								value={cart.order.phone}
								error={errors.phone && touched.phone}
								errorName={errors.phone || ''}
								placeholder='Ваше номер телефону *'
								onChange={e => {
									dispatch(CartActions.handleChange(e))
									setFieldValue('phone', e.target.value)
								}} />
							<Input
								type='text'
								name='message'
								value={cart.order.message}
								placeholder='Ваш комментар'
								onChange={e => dispatch(CartActions.handleChange(e))} />
							<span className={s.form_required}>обов’язкові поля</span>
							<Button
								type="submit"
								background="orange"
								styleName={s.form_btn}>
								Пітвердити
							</Button>
						</form>
					</div>
					<div className={s.order_container}>
						<Button
							type="button"
							background="transparent"
							styleName={s.order_edit}
							handleClick={() => dispatch(CartActions.handleCart(true))}>
							<span className={s.edit_title}>
								Редагувати замовлення
							</span>
							<div className={s.edit_btn}>
								<Icon name='arrow' className={classNames('icon', 'icon-arrow', s.edit_icon)} />
							</div>
						</Button>
						<div className={s.order_summary}>
							<h2 className={s.summary_title}>
								Замовлення
							</h2>
							<div className={s.summary_box}>
								<span className={s.summary_text}>
									Підсумок:
								</span>
								<span className={s.summary_price}>
									{cart.subtotal} грн
								</span>
							</div>
						</div>
						<div className={s.order_list}>
							{cart.items.length > 0 && cart.items.map((item, index) => (
								<div key={'item_' + index} className={s.list_item}>
									<picture className={s.list_image}>
										<img src={item.image} alt={item.title} />
									</picture>
									<Link to={`/catalogue/${item.type.url}/${item.url}`} className={s.list_title}>
										{item.title}
									</Link>
									<span className={s.list_size}>
										{item.quantity} м<sup>2</sup>
									</span>
									<span className={s.list_price}>
										{item.quantity * item.price},00 грн
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{cart.order_cart_items_status === 'loading' && <Preloader background />}
			{(cart.order_cart_items_status === 'error' || cart.order_cart_items_status === 'success') &&
				<Popup
					message={orderMessage[cart.order_cart_items_status]}
					status={cart.order_cart_items_status}
					handleReset={handleReset} />}
		</section>
	)
}

export default OrderPage
