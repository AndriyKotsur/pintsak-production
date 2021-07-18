import React from 'react'
import PropTypes from 'prop-types'

import s from './style.module.scss'

const Table = ({ options }) => {
	const measurement = options.measurement === 'Штука' ? 'шт.' : 'м2'

	return (
		<div className={s.table}>
			<h2 className={s.table_title}>
				Опис товару
			</h2>
			<table className={s.table_container}>
				<thead className={s.table_head}>
				<tr>
					<th>Довжина (см)</th>
					<th>Висота (см)</th>
					<th>Товщина (см)</th>
					<th>Кількість на од. виміру</th>
					<th>Вага / {measurement}</th>
				</tr>
				</thead>
				<tbody className={s.table_body}>
				<tr>
					<td>{options.width}</td>
					<td>{options.height}</td>
					<td>{options.thickness}</td>
					<td>{options.quantity}</td>
					<td>{options.weight}</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
}

Table.propTypes = {
	options: PropTypes.object
}

Table.defaultProps = {
	options: {}
}
export default Table
