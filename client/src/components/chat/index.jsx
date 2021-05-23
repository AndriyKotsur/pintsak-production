import React, { useState, useEffect } from 'react'

import { Form, Icon, Input, Title } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const Chat = () => {
  const [visible, setVisible] = useState(false)

  const handleButton = () => {
    setVisible(prev => !prev)
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
					<Form
						required>
						<Input
							type='text'
							name='title'
							title='Ваше Ім’я *'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
							required />
						<Input
							type='text'
							name='phone'
							title='Ваше номер телефону *'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
							required />
						<Input
							type='text'
							name='message'
							title='Ваш комментар'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
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