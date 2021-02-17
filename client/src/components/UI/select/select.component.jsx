import React from 'react'
import classNames from 'classnames'
import s from './style.module.scss'

const Select = ({ name, value, data, className, onChange }) => {
	return (
		<div className={s.field}>
			<select
				name={name}
				defaultValue={value}
				onChange={onChange}
				className={classNames(s.input, className)} required>
				{
					data ? data.map(item => (
						<option key={item.id}>{item.title}</option>
					))
						: <option>Категорія товару</option>
				}
			</select>
		</div>
	)
}

export default Select