import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Input, Select, Title } from 'components'

import s from '../style.module.scss'

const Characteristics = ({ formikProps }) => {
	const dispatch = useDispatch()

	const { errors, values, touched, setFieldValue } = formikProps

	const measurement = [
		{ _id: 'square_meter', title: 'Квадратний метр' },
		{ _id: 'pieces', title: "Штука" }
	]

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Характеристики продукту
			</Title>
			<Select
				name="measurement"
				value="Одиниці виміру"
				data={measurement}
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))} />
			<Input
				type='number'
				name='width'
				value={values.width}
				error={errors.width && touched.width}
				errorName={errors.width || ''}
				placeholder='Ширина товару'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e, 'sizes'))
					setFieldValue('width', e.target.value)
				}} />
			<Input
				type='number'
				name='height'
				value={values.height}
				error={!!errors.height && !!touched.height}
				errorName={errors.height || ''}
				placeholder='Висота товару'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e, 'sizes'))
					setFieldValue('height', e.target.value)
				}} />
			<Input
				type='number'
				name='thickness'
				value={values.thickness}
				error={errors.thickness && touched.thickness}
				errorName={errors.thickness || ''}
				placeholder='Товщина товару'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e, 'sizes'))
					setFieldValue('thickness', e.target.value)
				}} />
			<Input
				type='number'
				name='weight'
				value={values.weight}
				error={errors.weight && touched.weight}
				errorName={errors.weight || ''}
				placeholder='Вага на одиницю виміру'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e, 'sizes'))
					setFieldValue('weight', e.target.value)
				}} />
			<Input
				type='number'
				name='quantity'
				value={values.quantity}
				error={errors.quantity && touched.quantity}
				errorName={errors.quantity || ''}
				placeholder='Кількість на одиницю виміру'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e, 'sizes'))
					setFieldValue('quantity', e.target.value)
				}} />
		</Fragment >
	)
}

export default Characteristics
