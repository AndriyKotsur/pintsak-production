import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Input = ({
	type,
	name,
	value,
	title,
	isRequired,
	styleName,
	disabled,
	onChange
}) => {
	return (
		<div className={classNames(s.field, styleName)}>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				className={classNames(s.input, styleName)}
				onChange={onChange}
				disabled={disabled}
				required={isRequired} />
			<label htmlFor={name} className={s.label}>{title}</label>
		</div>
	)
}

export default Input
