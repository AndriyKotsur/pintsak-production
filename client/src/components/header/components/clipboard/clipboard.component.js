import React from 'react'
import s from './style.module.scss'

const Clipboard = () => {
	return (
		<div className={s.wrapper}>
			<span className={s.title}>Натисніть ще раз, щоб скопіювати в буфер обміну</span>
		</div>
	)
}

export default Clipboard