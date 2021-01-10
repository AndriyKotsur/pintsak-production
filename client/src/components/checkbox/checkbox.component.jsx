import React from 'react'
import classNames from 'classnames'
import s from './style.module.scss'

const Checkbox = ({name, label, className, checked, isRequired, onChange}) => {
	return (
		<div className="input-field contact-us-field">
			<input
				type='checkbox'
				name={name}
				className={classNames(s.input, className)}
				onChange={onChange}
				checked={checked}
				required={isRequired} />
			<label className={s.label}>{label}</label>
		</div>
	)
}

export default Checkbox