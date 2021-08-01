import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTypeActions from 'actions/add-type.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Background, Button, Input, Title } from 'components'

import s from './style.module.scss'

const AddType = () => {
	const [activeError, setActiveError] = useState(false)

	const history = useHistory()

	const dispatch = useDispatch()
	const state = useSelector(state => state.addType)

	const initialValues = {
		title: '',
	}
	
	const validationScheme = Yup.object().shape({
		title: Yup.string()
			.min(5, 'Довжина поля не менше як 5 символів')
			.max(150, 'Довжина поля не більше як 150 символів')
			.required('Поле є обов\'язковим'),
	})

	const handleValidate = (errors, touched) => {
		if (Object.keys(errors).length > 0 || Object.keys(touched).length === 0) setActiveError(true)
		else setActiveError(false)
	}

	const handleAddType = async () => {
		dispatch(AddTypeActions.addType(state))
	}

	useEffect(() => {
		if (state.add_type_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_type_status, history])

	useEffect(() => {
		return () => dispatch(AddTypeActions.clear())
	}, [dispatch])

	return (
		<section className={s.type}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className="container">
				<div className={s.type_wrapper}>
					<Title styleName={s.type_title}>
						Додати категорію
					</Title>
					<Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handleAddType}>
						{({ errors, touched, setFieldValue }) => (
							<Form>
								<Field name="title">
									{() => (
										<Input
											type='text'
											name='title'
											value={state.title}
											error={activeError && errors.title}
											errorName={errors.title || ''}
											placeholder='Назва категорії'
											onChange={e => {
												dispatch(AddTypeActions.handleChange(e))
												setFieldValue('title', e.target.value)
											}} />
									)}
								</Field>
								<Button
									type="submit"
									background="orange"
									styleName={s.type_button}
									handleClick={() => handleValidate(errors, touched)}>
									Підтвердити
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</section>
	)
}

export default AddType
