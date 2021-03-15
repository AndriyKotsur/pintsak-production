import React from 'react'
import { Icon, Form, Input } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Chat = () => {
	return (
		<div className={s.section}>
			<div className={s.wrapper}>
				<div className={s.background}></div>
				<div className={s.block}>
					<h2 className={s.title}>Звяжіться з нами</h2>
					<Form required>
						<Input
							type='text'
							name='title'
							title='Ваше Ім’я'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
							isRequired />
						<Input
							type='text'
							name='phone'
							title='Ваше номер телефону'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
							isRequired />
						<Input
							type='text'
							name='message'
							title='Ваш комментар'
							// onChange={e => dispatch(AddTileActions.handleChange(e))}
							isRequired />
					</Form>
				</div>
			</div>
			<div className={s.request}>
				<button className={s.button}>
					<Icon name="request" className="icon icon-request" />
				</button>
			</div>
		</div>
	)
}

export default Chat
