import React from 'react'

import s from './style.module.scss'

const Table = () => {
	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>Опис товару</h2>
			<table className={s.table}>
				<thead className={s.head}>
					<tr>
						<th>Товщина (см)</th>
						<th>Розмір (см)</th>
						<th>Шт на 1 м2</th>
						<th>Вага на 1 м2</th>
						<th>Ціна в базовому окрасі <span>(сірий, червоний)</span></th>
					</tr>
				</thead>
				<tbody className={s.body}>
					<tr>
						<td>2,5</td>
						<td>30х30 / 22х22</td>
						<td>11/11</td>
						<td>55</td>
						<td>130</td>
					</tr>
					<tr>
						<td>4,5</td>
						<td>30х30 / 22х22</td>
						<td>11/11</td>
						<td>100</td>
						<td>210</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Table