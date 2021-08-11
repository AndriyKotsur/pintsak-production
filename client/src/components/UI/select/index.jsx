import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Select = ({
	name,
	data,
	className,
	value,
	onChange
}) => {
	return (
		<div className={s.select}>
			<select
				name={name}
				defaultValue={typeof value === 'string' ? value : value._id}
				disabled={!data.length}
				className={classNames(s.select_container, className, { [s.disabled]: !data.length })}
				onChange={onChange}>
				{data.length ? data.map(item => (
					<option key={item._id} value={item._id}>{item.title}</option>
				))
					: <option>Немає доступних категорій</option>}
			</select>
		</div>
	)
}

Select.propTypes = {
	data: PropTypes.any,
	className: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func
}

Select.defaultProps = {
	data: [],
	className: '',
	name: '',
	onChange: () => null
}
export default Select