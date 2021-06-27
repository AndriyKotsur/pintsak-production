import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Input, Select, Title } from 'components'

const Characteristics = () => {
	const dispatch = useDispatch()

	const measurement = [ { title: "Квадратний метр" }, { title: "Штука" } ]

	return (
		<Fragment>
			<Title value="Характеристики продукту" />
			<Select
			name="measurement"
			value="Одиниці виміру"
			data={measurement}
			onChange={e => dispatch(AddTileActions.handleChange(e))} />
			<Input
				type='number'
				name='width'
				title='Ширина товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				required />
			<Input
				type='number'
				name='height'
				title='Висота товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				required />
			<Input
				type='number'
				name='thickness'
				title='Товщина товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				required />
			<Input
				type='number'
				name='weight_per_meter'
				title='Вага на метр кв.'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				required />
			<Input
				type='number'
				name='pieces_per_meter'
				title='Кількість на метр кв.'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				required />
		</Fragment>
	)
}

export default Characteristics
