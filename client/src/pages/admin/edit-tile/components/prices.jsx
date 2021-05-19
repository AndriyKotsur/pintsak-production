import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'
import { ColorsParser } from 'helpers'

import { Colors, Title } from 'components'

const Prices = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const handleChange = (type, color, price) => {
		const prices = ColorsParser(state.prices, type, color, price)
		dispatch(EditTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<Colors colors={state.prices} onChange={handleChange} />
		</Fragment>
	)
}

export default Prices