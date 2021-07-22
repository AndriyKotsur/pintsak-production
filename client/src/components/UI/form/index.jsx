import React from 'react'

import { Button } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Form = ({
	handler,
	children,
	required,
}) => {
	return (
	<form onSubmit={handler} className={s.form}>
		{children}
		{ required && <span className={s.required}>обов’язкові поля</span> }
		<Button
			type="submit"
			background="orange"
			styleName={s.btn}>
				Пітвердити
		</Button>
	</form>
	)
}

export default Form
