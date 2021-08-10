import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Checkbox, File, Input, Select, Title } from 'components'

import s from '../style.module.scss'

const Options = ({ formikProps }) => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const { errors, values, touched, setFieldValue } = formikProps

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Параметри продукту
			</Title>
			<File
				name='images'
				validFiles={state.images}
				error={errors.images && touched.images}
				errorName={errors.images || ''}
				handleChange={image => {
					dispatch(AddTileActions.handleChange(image))
					setFieldValue('images', image)
				}} />
			<Input
				type='text'
				name='title'
				value={values.title}
				error={errors.title && touched.title}
				errorName={errors.title || ''}
				placeholder='Назва товару'
				onChange={e => {
					dispatch(AddTileActions.handleChange(e))
					setFieldValue('title', e.target.value)
				}} />
			<Select
				name='type'
				value={state.type}
				data={state.types}
				onChange={e => {
					dispatch(AddTileActions.handleChange(e))
				}} />
			<div className={s.steps_group}>
				<Checkbox
					name='is_available'
					label='Товар в наявності?'
					checked={state.is_available}
					onChange={e => {
						dispatch(AddTileActions.handleChange(e))
					}} />
				<Checkbox
					name='is_popular'
					label='Популярний товар?'
					checked={state.is_popular}
					onChange={e => {
						dispatch(AddTileActions.handleChange(e))
					}} />
			</div>
		</Fragment>
	)
}

export default Options
