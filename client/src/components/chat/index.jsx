import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SendRequestAction from 'actions/send-request.action'

import { Form, Icon, Input, Title } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const Chat = () => {
  const [visible, setVisible] = useState(false)

	const dispatch = useDispatch()
	const request = useSelector(state => state.sendRequest)

  const handleButton = () => {
    setVisible(prev => !prev)
  }

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(SendRequestAction.sendRequest(request))
	}

	useEffect(() => {
		visible && document.body.classList.add(s.hidden)
		!visible && document.body.classList.remove(s.hidden)
	}, [visible])

  return (
    <div className={s.chat_container}>
      <div className={classNames(s.chat_wrapper, {[s.visible]: visible})}>
        <span className={s.chat_background}></span>
        <div className={s.chat_menu}>
					<Title value="Зв'яжіться з нами" />
					<Form handler={handleSubmit} required>
						<Input
							type='text'
							name='name'
							title='Ваше Ім’я *'
							onChange={e => dispatch(SendRequestAction.handleChange(e))}
							required />
						<Input
							type='number'
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
      <div className={s.chat}  onClick={handleButton}>
        <button type="button" className={s.chat_button}>
          <Icon name="request" className="icon icon-request" />
        </button>
      </div>
    </div>
  )
}

export default Chat