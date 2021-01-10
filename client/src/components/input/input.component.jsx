import React from 'react'
import s from './style.module.scss'

const Input = ({ type, name, value, title, isRequired, onChange }) => {
	return (
		<div className={s.field}>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={s.input}
				placeholder={title}
				required={isRequired}  />
		</div>
	)
}

export default Input