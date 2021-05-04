import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Title, Input } from 'components'

const Prices = () => {
	const dispatch = useDispatch()

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<Input
				type='number'
				name='grey'
				title='Ціна сірого продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
			<Input
				type='number'
				name='yellow'
				title='Ціна жовтого продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
			<Input
				type='number'
				name='orange'
				title='Ціна помаранчевого продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
			<Input
				type='number'
				name='red'
				title='Ціна червоного продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
			<Input
				type='number'
				name='brown'
				title='Ціна коричневого продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
			<Input
				type='number'
				name='black'
				title='Ціна чорного продукту'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'prices'))}
				isRequired />
		</Fragment>
	)
}

export default Prices