import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SendRequestAction from 'actions/send-request.action'

import { Form, Icon, Input, Preloader, Popup } from 'components'

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

	const handleChatSubmit = (e) => {
		e.preventDefault()
		dispatch(SendRequestAction.sendRequest(state))
		// Clean state after receiving response from the email server
		setTimeout(() => {
			dispatch(SendRequestAction.clearRequest())
			// Close chat window in case of receiving response from the email server
			handleChatActive()
		}, 500)
	}

	useEffect(() => {
		activeChat && document.body.classList.add(s.hidden)
		!activeChat && document.body.classList.remove(s.hidden)
	}, [activeChat])

  return (
    <section className={s.chat}>
      <div className={classNames(s.chat_wrapper, {[s.visible]: activeChat})}>
        <span className={s.chat_background} />
        <div className={s.chat_menu}>
					<h3 className={s.chat_title}>
						Зв'яжіться з нами
					</h3>
					<Form handler={handleChatSubmit} required>
						<Input
							type='text'
							name='name'
							title='Ваше Ім’я *'
							value={state.request.name}
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='number'
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