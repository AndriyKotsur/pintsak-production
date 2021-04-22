import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Form = ({
	title,
	text,
	handler,
	children,
	required,
	controllers,
	handlerController,
	handlerAction,
	handlerSubmit,
}) => {
	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>{title}</h2>
			{ text && <p className={s.text}>{text}</p> }
			<form onSubmit={handler} className={s.form}>
				{children}
				{ required && <span className={s.required}>обов’язкові поля</span> }
				{ controllers ?
					<div className={s.controllers}>
						<button
							type="button"
							className={classNames('btn-sent', 'btn-orange', s.back)}
							onClick={handlerAction}>Назад</button>
						<button
							type="submit"
							className={classNames('btn-sent', 'btn-orange', s.continue)}>Продовжити</button>
					</div>
					: <button type="submit" className={classNames('btn-sent', 'btn-orange', s.btn)}>Пітвердити</button>
				}
			</form>
		</div>
	)
}

export default Form
