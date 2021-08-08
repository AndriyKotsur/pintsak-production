import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorsParser } from 'helpers'
import * as AddTileActions from 'actions/add-tile.action'

import { Colors, Title } from 'components'

import s from '../style.module.scss'

const Prices = ({ formikProps }) => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	
	const { errors, values, setFieldValue } = formikProps
	
	const onChange = (type, color, price) => {
		const prices = ColorsParser(state.prices, type, color, price)
		
		setFieldValue('prices', prices)
		dispatch(AddTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Ціна продукту
			</Title>
			<Colors
				name="prices"
				colors={state.prices}
				onChange={onChange} />
		</Fragment>
	)
}

export default Prices