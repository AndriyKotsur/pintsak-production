import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Input = ({
	name,
	type,
	value,
	children,
	error,
	errorName,
	styleName,
	placeholder,
	disabled,
	onChange
}) => {
	let classes = {
		[s.disabled]: disabled,
		[s.error]: error
	}

	return (
		<div className={classNames(s.input, classes, styleName)}>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				placeholder=" "
				className={s.input_container}
				onChange={onChange} />
			<label htmlFor={name} className={s.input_label}>
				{placeholder}
			</label>
			{children}
			{error &&
				<span className={s.input_error}>
					{errorName}
				</span>}
		</div>
	)
}

Input.propTypes = {
	disabled: PropTypes.bool,
	name: PropTypes.string,
	title: PropTypes.string,
	type: PropTypes.string,
	styleName: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func
}

Input.defaultProps = {
	disabled: false,
	name: '',
	title: '',
	type: '',
	styleName: '',
	required: false,
	onChange: () => null
}
export default Input
