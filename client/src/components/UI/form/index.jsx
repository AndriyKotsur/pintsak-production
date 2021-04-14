import React, { useMemo } from 'react'
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
}) => {

	// const button = useMemo(() => {
	// 	const buttons = {
	// 		''
	// 	}
	// }, [])

	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>
				{title}
			</h2>
			{ text && <p className={s.text}>{text}</p> }
			<form onSubmit={handler} className={s.form}>
				{children}
				{ required && <span className={s.required}>обов’язкові поля</span> }
				<button className={classNames('btn-sent', 'btn-orange', s.btn)}>Пітвердити</button>
				{
						controllers && 
						<div className={s.controllers}>
							<button
							type="button"
							className={s.back}
							onClick={handlerController}>Назад</button>
							<button
							type="submit"
							className={s.continue}>Продовжити</button>
						</div>
				}
			</form>
		</div>
	)
}

export default Form