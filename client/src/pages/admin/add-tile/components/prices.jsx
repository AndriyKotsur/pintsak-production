import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import { ColorsParser } from 'helpers'

import { Colors, Title  } from 'components'

const Prices = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const onChange = (type, color, price) => {
		const prices = ColorsParser(state.prices, type, color, price)
		dispatch(AddTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<Colors colors={state.prices} onChange={onChange} />
		</Fragment>
	)
}

export default Prices