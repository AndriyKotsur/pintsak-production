import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorsParser } from 'helpers'
import * as AddTileActions from 'actions/add-tile.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Colors, Title } from 'components'

import s from '../style.module.scss'

const Prices = ({ getData }) => {
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

	const onChange = (type, color, price) => {
		const prices = ColorsParser(state.prices, type, color, price)
		dispatch(AddTileActions.handleChangeColor(prices))
	}

	React.useEffect(() => {
		submitted && stepRef.current.click()

		setSubmitted(true)
	}, [state.current_step.step3])

	return (
		<Fragment>
			<Title styleName={s.steps_title}>
				Ціна продукту
			</Title>
			<Formik initialValues={initialValues} validationSchema={validationScheme}>
				{({ errors, touched, setFieldValue }) => (
					<Form>
						<Field name="title">
							{() => (
								<Colors colors={state.prices} onChange={onChange} />
							)}
						</Field>
						<button ref={stepRef} onClick={getData(errors, touched)} hidden />
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default Prices