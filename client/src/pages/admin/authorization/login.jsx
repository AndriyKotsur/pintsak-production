// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as AuthActions from '../../../actions/login.action'
import * as Yup from 'yup'

import { Background, Button, Icon, Input, Title } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)

	const history = useHistory()

	const dispatch = useDispatch()
	const login = useSelector(state => state.login)

	const handleSubmit = () => {
		dispatch(AuthActions.login(login))
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.max(254, 'Довжина пошти не більше як 254 символа')
				.email('Поштова адреса має бути валідною')
				.required('Поле є обов\'язковим'),
			password: Yup.string()
				.min(8, 'Пароль має містити принаймні 8 символів')
				.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Пароль повинен містити спеціальні символи')
				.required('Поле є обов\'язковим')
		}),
		onSubmit: handleSubmit
	})

	const { errors, touched, setFieldValue } = formik

	useEffect(() => {
		if (login.loginStatus === 'success')
			history.push('/admin/dashboard')
	}, [login.loginStatus, history])

	return (
		<section className={s.login}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className={classNames('container', s.login_container)}>
				<div className={s.login_wrapper}>
					<Title styleName={s.login_title}>
						Вхід в панель керування
					</Title>
					<form onSubmit={formik.handleSubmit}>
						<Input
							type='email'
							name='email'
							value={login.email}
							error={errors.email && touched.email}
							errorName={errors.email || ''}
							placeholder='Введіть логін'
							onChange={e => {
								dispatch(AuthActions.handleChange(e))
								setFieldValue('email', e.target.value)
							}} />
						<Input
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={login.password}
							error={errors.password && touched.password}
							errorName={errors.password || ''}
							placeholder='Введіть пароль'
							onChange={e => {
								dispatch(AuthActions.handleChange(e))
								setFieldValue('password', e.target.value)
							}}>
							<Icon
								name="password"
								className={s.login_password}
								onClick={() => setShowPassword(prev => !prev)} />
						</Input>
						<Button
							type="submit"
							background="orange"
							styleName={s.login_button}>
							Підтвердити
						</Button>
					</form>
					{login.loginStatus === 'error' && (
						<span className={s.login_error}>
							Не правильний логін або пароль!
						</span>)}
				</div>
			</div>
		</section>
	)
}

export default Login
