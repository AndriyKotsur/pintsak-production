import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SendRequestAction from 'actions/send-request.action'

import { Background, Form, Input, Popup, Title } from 'components'

import s from './style.module.scss'

const Contact = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.sendRequest)

	const message = {
		'error': 'Помилка. Ваш запит не був відправлений, заповніть обов\'язкові поля, щоб відправити запит!',
		'success': 'Дякуємо. Ваше запит був успішно відправлений, ми зв\'яжемося з вами найближчим часом!'
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(SendRequestAction.sendRequest(state))
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(SendRequestAction.clearForm())
		}, 500)
	}

	return (
		<div className={s.contact}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }}/>
			<div className="container">
				<div className={s.contact_wrapper}>
					<Title value="Звяжіться з нами" />
					<Form handler={handleSubmit} required>
						<Input
							type='text'
							name='name'
							title='Ваше Ім’я *'
							value={state.request.name}
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='text'
							name='phone'
							title='Ваше номер телефону *'
							value={state.request.phone}
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='text'
							name='message'
							title='Ваш комментар'
							value={state.request.message}
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
					</Form>
				</div>
			</div>
			{ state.send_request_status.includes('error', 'success') && 
				<Popup
					message={message[state.send_request_status]}
					status={state.send_request_status}
					onChange={() => dispatch(SendRequestAction.clear())} /> }
		</div>
	)
}

export default Contact
