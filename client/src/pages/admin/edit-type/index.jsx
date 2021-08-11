import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as EditTypeActions from 'actions/edit-type.action'
import * as Yup from 'yup'

import { Background, Button, Preloader, Title, Input } from 'components'

import s from './style.module.scss'

const EditType = () => {
	const history = useHistory()
	const { id } = useParams()

	const dispatch = useDispatch()
	const state = useSelector(state => state.editType)

	const handleUpdateType = async () => {
		dispatch(EditTypeActions.editType(id, state))
	}

	const formik = useFormik({
		initialValues: {
			title: state.title
		},
		validationSchema: Yup.object().shape({
			title: Yup.string()
				.min(2, 'Довжина поля не менше як 2 символа')
				.max(50, 'Довжина поля не більше як 50 символів')
				.required('Поле є обов\'язковим'),
		}),
		onSubmit: handleUpdateType
	})

	const { errors, touched, setFieldValue } = formik

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
							<form onSubmit={formik.handleSubmit}>
								<Input
									type='text'
									name='title'
									value={state.title}
									error={errors.title && touched.title}
									errorName={errors.title || ''}
									placeholder='Назва категорії'
									onChange={e => {
										dispatch(EditTypeActions.handleChange(e))
										setFieldValue('title', e.target.value)
									}} />
								<Button
									type="submit"
									background="orange"
									styleName={s.type_button}>
									Підтвердити
								</Button>
							</form>
						</div>
					</div>
				</section>
			)}
		</Fragment>
	)
}

export default EditType