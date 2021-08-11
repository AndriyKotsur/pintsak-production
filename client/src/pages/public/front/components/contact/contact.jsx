import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as SendRequestAction from 'actions/send-request.action'
import * as Yup from 'yup'

import { Background, Button, Input, Preloader, Popup, Title } from 'components'

import s from './style.module.scss'

const Contact = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.sendRequest)

	const message = {
		'error': 'Помилка. Ваш запит не був відправлений, заповніть обов\'язкові поля, щоб відправити запит!',
		'success': 'Дякуємо. Ваше запит був успішно відправлений, ми зв\'яжемося з вами найближчим часом!'
	}

	const handleClear = () => {
		formik.setTouched({})
		formik.setErrors({})
	}

	const handleReset = () => {
		dispatch(SendRequestAction.clear())
	}

	const handleSubmit = () => {
		dispatch(SendRequestAction.sendRequest(state))
		handleClear()
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(SendRequestAction.clearRequest())
		}, 500)
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
		<section className={s.contact}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className="container">
				<div className={s.contact_wrapper}>
					<Title styleName={s.contact_title}>
						Зв'яжіться з нами
					</Title>
					<form onSubmit={formik.handleSubmit}>
						<Input
							type='text'
							name='name'
							value={state.request.name}
							error={errors.name && touched.name}
							errorName={errors.name || ''}
							placeholder='Ваше Ім’я *'
							onChange={e => {
								dispatch(SendRequestAction.handleChange(e))
								setFieldValue('name', e.target.value)
							}} />
						<Input
							type='text'
							name='phone'
							value={state.request.phone}
							error={errors.phone && touched.phone}
							errorName={errors.phone || ''}
							placeholder='Ваше номер телефону *'
							onChange={e => {
								dispatch(SendRequestAction.handleChange(e))
								setFieldValue('phone', e.target.value)
							}} />
						<Input
							type='text'
							name='message'
							value={state.request.message}
							placeholder='Ваш комментар'
							onChange={e => dispatch(SendRequestAction.handleChange(e))} />
						<span className={s.contact_required}>обов’язкові поля</span>
						<Button
							type="submit"
							background="orange"
							styleName={s.contact_btn}>
							Пітвердити
						</Button>
					</form>
				</div>
			</div>
			{state.send_request_status === 'loading' && <Preloader background />}
			{(state.send_request_status === 'error' || state.send_request_status === 'success') &&
				<Popup
					message={message[state.send_request_status]}
					status={state.send_request_status}
					handleReset={handleReset} />}
		</section>
	)
}

export default Contact
