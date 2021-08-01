import React, { Fragment, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Title, Input, Select, Checkbox, File } from 'components'

import s from '../style.module.scss'

const Options = ({ getData }) => {
	const [submitted, setSubmitted] = useState(false)

	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const stepRef = useRef(null)

	const initialValues = {
		title: '',
	}

	const validationScheme = Yup.object().shape({
		title: Yup.string()
			.min(5, 'Довжина поля не менше як 5 символів')
			.max(150, 'Довжина поля не більше як 150 символів')
			.required('Поле є обов\'язковим'),
	})

	React.useEffect(() => {
		submitted && stepRef.current.click()

		setSubmitted(true)
	}, [state.current_step.step1])

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Параметри продукту
			</Title>
			<Formik initialValues={initialValues} validationSchema={validationScheme}>
				{({ errors, touched, setFieldValue }) => (
					<Form>
						<Field name="images">
							{() => (
								<File onChange={image => dispatch(AddTileActions.handleChange(image))} />
							)}
						</Field>
						<Field name="title">
							{() => (
								<Input
									type='text'
									name='title'
									value={state.title}
									error={errors.title}
									errorName={errors.title || ''}
									placeholder='Назва товару'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e))
										setFieldValue('title', e.target.value)
									}} />
							)}
						</Field>
						<Field name="type">
							{() => (
								<Select
									name='type'
									value={state.type}
									data={state.types}
									onChange={e => {
										dispatch(AddTileActions.handleChange(e))
										setFieldValue('type', e.target.value)}
									} />
							)}
						</Field>
						<Field name="is_popular">
							{() => (
								<Checkbox
									name='is_popular'
									label='Популярний?'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e))
										setFieldValue('is_popular', e.target.value)}
									} />
							)}
						</Field>
						<Field name="is_avaiable">
							{() => (
								<Checkbox
									name='is_available'
									label='В наявності?'
									onChange={e => {
										dispatch(AddTileActions.handleChange(e))
										setFieldValue('is_available', e.target.value)}
									} />
							)}
						</Field>
						<button ref={stepRef} onClick={getData(errors, touched)} hidden />
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default Options
