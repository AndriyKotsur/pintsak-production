import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Input = ({
	disabled,
	name,
	title,
	type,
	required,
	styleName,
	value,
	onChange
}) => {
	return (
		<div className={classNames(s.input, styleName, {[s.disabled]: disabled})}>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				className={s.input_container}
				required={required}
				onChange={onChange} />
			<label htmlFor={name} className={s.input_label}>
				{title}
			</label>
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
