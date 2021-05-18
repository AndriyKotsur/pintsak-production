import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Title, Input, Colors } from 'components'
import { ColorsBuilder } from 'helpers'

const Prices = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const onChange = (type, name, event) => {
		const prices = ColorsBuilder(state.prices, type, name, event)
		dispatch(AddTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<Colors colors={state.prices} onChange={onChange} />
			{/* <Input
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
				isRequired /> */}
		</Fragment>
	)
}

export default Prices