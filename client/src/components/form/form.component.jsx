import React from 'react'
import classNames from 'classnames'
import s from './style.module.scss'

const Form = ({title, handler, children}) => {
	return (
		<div className={s.wrapper}>
			<div className="container">
				<div className={s.inner}>
					<h2 className={s.title}>
						{title}
					</h2>
					<form onSubmit={handler} className={s.form}>
						{children}
						<button className={classNames('btn-sent', 'btn-orange', s.btn)}>Пітвердити</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Form