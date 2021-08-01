// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'
import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { Background, Button, Icon, Input, Title } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Login = () => {
	const [activeError, setActiveError] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const history = useHistory()
	
	const dispatch = useDispatch()
	const login = useSelector(state => state.login)

	const initialValues = {
		email: '',
		password: ''
	}

	const validationScheme = Yup.object().shape({
		email: Yup.string()
			.max(254, 'Довжина пошти не більше як 254 символа')
			.email('Поштова адреса має бути валідною')
			.required('Поле є обов\'язковим'),
		password: Yup.string()
			.min(8, 'Пароль має містити принаймні 8 символів')
			.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Пароль повинен містити як мінімум одну малу літеру, одну велику літеру і одну цифру')
			.required('Поле є обов\'язковим')
	})

	const handleValidate = (errors, touched) => {
		if (Object.keys(errors).length > 0 || Object.keys(touched).length === 0) setActiveError(true)
		else setActiveError(false)
	}

	const handleSubmit = () => {
		dispatch(AuthActions.login(login))
	}

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
					<Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handleSubmit}>
						{({ errors, touched, setFieldValue }) => (
							<Form>
								<Field name="email">
									{() => (
										<Input
											type='email'
											name='email'
											value={login.email}
											error={activeError && errors.email}
											errorName={errors.email || ''}
											placeholder='Введіть логін'
											onChange={e => {
												dispatch(AuthActions.handleChange(e))
												setFieldValue('email', e.target.value)
											}} />
									)}
								</Field>
								<Field name="password">
									{() => (
										<Input
											type={showPassword ? 'text' : 'password'}
											name='password'
											value={login.password}
											error={activeError && errors.password}
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
									)}
								</Field>
								<Button
									type="submit"
									background="orange"
									styleName={s.login_button}
									handleClick={() => handleValidate(errors, touched)}>
									Підтвердити
								</Button>
							</Form>
						)}
					</Formik>
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
