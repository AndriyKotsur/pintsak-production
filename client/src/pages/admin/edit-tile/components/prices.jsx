import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Colors, Title } from 'components'
import { ColorsBuilder } from 'helpers'

const Prices = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const onChange = (type, name, event) => {
		const prices = ColorsBuilder(state.prices, type, name, event)
		dispatch(EditTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<Colors colors={state.prices} onChange={onChange} />
		</Fragment>
	)
}

export default Prices