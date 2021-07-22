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
			<div className={s.table_container}>
				<div className={s.table_head}>
					<span>
						Довжина (см)
					</span>
					<span>
						Висота (см)
					</span>
					<span>
						Товщина (см)
					</span>
					<span>
						Кількість на од. виміру
					</span>
					<span>
						Вага / {measurement}
					</span>
				</div>
				<div className={s.table_body}>
					<span>
						{options.width}
					</span>
					<span>
						{options.height}
					</span>
					<span>
						{options.thickness}
					</span>
					<span>
						{options.quantity}
					</span>
					<span>
						{options.weight}
					</span>
				</div>
			</div>
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
