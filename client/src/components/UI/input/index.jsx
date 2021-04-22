import React from 'react'
import s from './style.module.scss'

const Input = ({ type, name, value, title, isRequired, onChange }) => {
	return (
		<div className={s.field}>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				className={s.input}
				onChange={onChange}
				required={isRequired}  />
			<label htmlFor={name} className={s.label}>{title}</label>
		</div>
	)
}

export default Input
