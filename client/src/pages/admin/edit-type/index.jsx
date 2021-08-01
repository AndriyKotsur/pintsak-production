import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTypeActions from 'actions/edit-type.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Background, Button, Preloader, Title, Input } from 'components'

import s from './style.module.scss'

const EditType = () => {
	const [activeError, setActiveError] = useState(false)

	const history = useHistory()
	const { id } = useParams()

	const dispatch = useDispatch()
	const state = useSelector(state => state.editType)

	const initialValues = {
		title: state.title,
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

	const handleUpdateType = async () => {
		dispatch(EditTypeActions.editType(id, state))
	}

	useEffect(() => {
		if (state.edit_type_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_type_status, history])

	useEffect(() => {
		dispatch(EditTypeActions.getType(id))
		return () => dispatch(EditTypeActions.clear())
	}, [id, dispatch])

	return (
		<Fragment>
			{state.get_type_status === 'loading' && <Preloader />}
			{state.get_type_status === 'success' && (
				<section className={s.type}>
					<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
					<div className="container">
						<div className={s.type_wrapper}>
							<Title styleName={s.type_title}>
								Редагувати категорію
							</Title>
							<Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handleUpdateType}>
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
														dispatch(EditTypeActions.handleChange(e))
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
			)}
		</Fragment>
	)
}

export default EditType