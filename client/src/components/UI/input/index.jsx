import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Input = ({
	type,
	name,
	value,
	title,
	styleName,
	disabled,
	required,
	onChange
}) => {
	return (
		<div className={classNames(s.field, styleName, {[s.disabled]: disabled})}>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				className={s.input}
				onChange={onChange}
				required={required} />
			<label htmlFor={name} className={s.label}>{title}</label>
		</div>
	)
}

export default Input
