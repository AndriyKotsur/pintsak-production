import React from 'react'

import { Background, Title, Form, Input } from 'components'

import s from './style.module.scss'

const Contact = () => {
	return (
		<div className={s.contact}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }}/>
			<div className="container">
				<div className={s.contact_wrapper}>
					<Title value="Звяжіться з нами" />
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
							 />
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Contact
