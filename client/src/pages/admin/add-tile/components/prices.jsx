import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Colors, Title  } from 'components'
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
		</Fragment>
	)
}

export default Prices