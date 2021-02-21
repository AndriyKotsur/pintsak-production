import React from 'react'
import classNames from 'classnames'
import s from './style.module.scss'

const Select = ({ name, value, data, className, onChange }) => {
	console.log(data)
	return (
		<div className={s.field}>
			<select
				name={name}
				defaultValue={value}
				onChange={onChange}
				disabled={!data.length}
				className={classNames(s.input, {[s.disabled]: !data.length}, className)} required>
				{
					data.length ? data.map(item => (
						<option key={item.id}>{item.title}</option>
					))
						: <option>Немає доступних категорій</option>
				}
			</select>
		</div>
	)
}

export default Select