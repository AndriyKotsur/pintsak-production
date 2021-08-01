import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Input, Select, Title } from 'components'

import s from '../style.module.scss'

const Characteristics = ({ getData }) => {
	const [submitted, setSubmitted] = useState(false)

	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const stepRef = useRef(null)

	const measurement = [{ title: "Квадратний метр" }, { title: "Штука" }]

	const initialValues = {
		weight: '',
	}

	const validationScheme = Yup.object().shape({
		weight: Yup.string()
			.min(5, 'Довжина поля не менше як 5 символів')
			.max(150, 'Довжина поля не більше як 150 символів')
			.required('Поле є обов\'язковим'),
	})

	React.useEffect(() => {
		submitted && stepRef.current.click()

		setSubmitted(true)
	}, [state.current_step.step2])

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Характеристики продукту
			</Title>
			<Formik initialValues={initialValues} validationSchema={validationScheme}>
				{({ errors, touched, setFieldValue }) => (
					<Form>
						<Field name="type">
							{() => (
								<Select
									name="measurement"
									value="Одиниці виміру"
									data={measurement}
									onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))} />
							)}
						</Field>
						<Field name="weight">
							{() => (
								<Input
									type='number'
									name='weight'
									value={state.sizes.weight}
									error={errors.weight}
									errorName={errors.weight || ''}
									placeholder='Вага на одиницю виміру'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e, 'sizes'))
										setFieldValue('weight', e.target.value)
									}} />
							)}
						</Field>
						<Field name="quantity">
							{() => (
								<Input
									type='number'
									name='quantity'
									value={state.sizes.quantity}
									error={errors.quantity}
									errorName={errors.quantity || ''}
									placeholder='Кількість на одиницю виміру'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e, 'sizes'))
										setFieldValue('quantity', e.target.value)
									}} />
							)}
						</Field>
						<Field name="width">
							{() => (
								<Input
									type='number'
									name='width'
									value={state.sizes.width}
									error={errors.width}
									errorName={errors.width || ''}
									placeholder='Ширина товару'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e, 'sizes'))
										setFieldValue('width', e.target.value)
									}} />
							)}
						</Field>
						<Field name="height">
							{() => (
								<Input
									type='number'
									name='height'
									value={state.sizes.width}
									error={errors.height}
									errorName={errors.height || ''}
									placeholder='Висота товару'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e, 'sizes'))
										setFieldValue('height', e.target.value)
									}} />
							)}
						</Field>
						<Field name="thickness">
							{() => (
								<Input
									type='number'
									name='thickness'
									value={state.sizes.thickness}
									error={errors.thickness}
									errorName={errors.thickness || ''}
									placeholder='Товщина товару'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e, 'sizes'))
										setFieldValue('thickness', e.target.value)
									}} />
							)}
						</Field>
						<button ref={stepRef} onClick={getData(errors, touched)} hidden />
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default Characteristics
