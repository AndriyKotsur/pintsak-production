import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SendRequestAction from 'actions/send-request.action'

import { Background, Title, Form, Input } from 'components'

import s from './style.module.scss'

const Contact = () => {
	const dispatch = useDispatch()
	const request = useSelector(state => state.sendRequest)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(SendRequestAction.sendRequest(request))
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
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='text'
							name='phone'
							title='Ваше номер телефону *'
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='text'
							name='message'
							title='Ваш комментар'
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Contact
