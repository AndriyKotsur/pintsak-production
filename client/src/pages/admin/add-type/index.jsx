import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as AddTypeActions from 'actions/add-type.action'
import * as Yup from 'yup'

import { Background, Button, Input, Title } from 'components'

import s from './style.module.scss'

const AddType = () => {
	const history = useHistory()

	const dispatch = useDispatch()
	const state = useSelector(state => state.addType)

	const handleAddType = async () => {
		dispatch(AddTypeActions.addType(state))
	}

	const formik = useFormik({
		initialValues: {
			title: ''
		},
		validationSchema: Yup.object().shape({
			title: Yup.string()
				.min(2, 'Довжина поля не менше як 2 символа')
				.max(50, 'Довжина поля не більше як 50 символів')
				.required('Поле є обов\'язковим'),
		}),
		onSubmit: handleAddType
	})

	const { errors, touched, setFieldValue } = formik

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
					<form onSubmit={formik.handleSubmit}>
						<Input
							type='text'
							name='title'
							value={state.title}
							error={errors.title && touched.title}
							errorName={errors.title || ''}
							placeholder='Назва категорії'
							onChange={e => {
								dispatch(AddTypeActions.handleChange(e))
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
	)
}

export default AddType
