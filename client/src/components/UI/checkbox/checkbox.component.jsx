import React from 'react'
import classNames from 'classnames'
import s from './style.module.scss'

import { Icon } from 'components'

const Checkbox = ({name, label, className, checked, isRequired, onChange}) => {
	return (
		<div className={s.field}>
			<label className={classNames(s.checkbox, className)}>
				<input
					type='checkbox'
					name={name}
					onChange={onChange}
					checked={checked}
					required={isRequired} />
				<Icon name='checkbox' className={classNames('icon', 'icon-checkbox')} />
			</label>
			<p className={s.label}>{label}</p>
		</div>
	)
}

export default Checkbox