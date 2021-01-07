import React from 'react'
import s from './style.module.scss'

const Input = ({ name, title, onChange }) => {
	return (
		<div className={s.field}>
			<input type="text" name={name} onChange={onChange} className={s.input} placeholder={title} required/>
		</div>
	)
}

export default Input