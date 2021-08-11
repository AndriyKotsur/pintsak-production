import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'
import { ColorsParser } from 'helpers'

import { Colors, Title } from 'components'

import s from '../style.module.scss'

const Prices = ({ formikProps }) => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const { errors, values, touched, setFieldValue, setErrors, setTouched } = formikProps

	const handleChangeColor = (name, value) => {
		setFieldValue(`prices.${name}`, value)
	}

	const handleResetForm = () => {
		setTouched({})
		setErrors({})
	}

	const handleSubmit = (type, color, price) => {
		const prices = ColorsParser(state.prices, type, color, price)

		dispatch(EditTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Ціна продукту
			</Title>
			<Colors
				values={values.prices}
				error={errors.prices && touched.prices}
				errorName={errors.prices || ''}
				colors={state.prices}
				onChange={handleChangeColor}
				onReset={handleResetForm}
				onSubmit={handleSubmit} />
		</Fragment>
	)
}

export default Prices