import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as SendRequestAction from 'actions/send-request.action'
import * as Yup from 'yup'

import { Button, Icon, Input, Preloader, Popup } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Chat = () => {
	const [activeChat, setActiveChat] = useState(false)

	const dispatch = useDispatch()
	const state = useSelector(state => state.sendRequest)

	const message = {
		'error': 'Помилка. Ваш запит не був відправлений, заповніть обов\'язкові поля, щоб відправити запит!',
		'success': 'Дякуємо. Ваше запит був успішно відправлений, ми зв\'яжемося з вами найближчим часом!'
	}

	const handleChatActive = () => {
		setActiveChat(prev => !prev)
	}

	const handleChatReset = () => {
		dispatch(SendRequestAction.clear())
	}

	const handleChatClear = () => {
		formik.setTouched({})
		formik.setErrors({})
	}

	const handleChatSubmit = () => {
		dispatch(SendRequestAction.sendRequest(state))
		handleChatClear()
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(SendRequestAction.clearRequest())
			// Close chat window in case of receiving response from the email server
			handleChatActive()
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
		onSubmit: handleChatSubmit
	})

	const { errors, touched, setFieldValue } = formik

	useEffect(() => {
		activeChat && document.body.classList.add(s.hidden)
		!activeChat && document.body.classList.remove(s.hidden)
	}, [activeChat])

	return (
		<section className={s.chat}>
			<div className={classNames(s.chat_wrapper, { [s.visible]: activeChat })}>
				<span className={s.chat_background} />
				<div className={s.chat_menu}>
					<h3 className={s.chat_title}>
						Зв'яжіться з нами
					</h3>
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
						<span className={s.chat_required}>обов’язкові поля</span>
						<Button
							type="submit"
							background="orange"
							styleName={s.chat_submit}>
							Пітвердити
						</Button>
					</form>
				</div>
			</div>
			<div
				className={s.chat}
				onClick={handleChatActive}>
				<button type="button" className={s.chat_button}>
					<Icon name="request" className="icon icon-request" />
				</button>
			</div>

			{state.send_request_status === 'loading' && <Preloader background />}
			{(state.send_request_status === 'error' || state.send_request_status === 'success') &&
				<Popup
					message={message[state.send_request_status]}
					status={state.send_request_status}
					handleReset={handleChatReset} />}
		</section>
	)
}

export default Chat