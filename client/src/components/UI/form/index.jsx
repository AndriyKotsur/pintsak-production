import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Form = ({
	title,
	text,
	handler,
	children,
	required
}) => {
	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>{title}</h2>
			{ text && <p className={s.text}>{text}</p> }
			<form onSubmit={handler} className={s.form}>
				{children}
				{ required && <span className={s.required}>обов’язкові поля</span> }
				<button type="submit" className={classNames('btn-sent', 'btn-orange', s.btn)}>Пітвердити</button>
			</form>
		</div>
	)
}

export default Form
