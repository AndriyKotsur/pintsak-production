import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

import { Icon } from 'components'

const Checkbox = ({
	name,
	label,
	className,
	checked,
	isRequired,
	onChange
}) => {
	return (
		<div className={s.checkbox}>
			<label htmlFor={name} className={classNames(s.checkbox_label, className)}>
				<input
					type='checkbox'
					id={name}
					name={name}
					onChange={onChange}
					checked={checked}
					required={isRequired} />
				<Icon name='checkbox' className={classNames('icon', 'icon-checkbox')} />
				<p className={s.checkbox_title}>
				{label}
			</p>
			</label>
		</div>
	)
}

Checkbox.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
  className: PropTypes.string,
	isRequired: PropTypes.bool,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
	name: '',
	label: '',
  className: '',
	isRequired: false,
  onChange: () => null
}
export default Checkbox