import React from 'react'

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
		<button type="submit" className={classNames('btn-sent', 'btn-orange', s.btn)}>Пітвердити</button>
	</form>
	)
}

export default Form
