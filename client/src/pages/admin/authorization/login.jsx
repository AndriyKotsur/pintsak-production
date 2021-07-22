// @ts-nocheck
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'

import { Background, Title, Form, Input } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Login = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const login = useSelector(state => state.login)

	useEffect(() => {
		if (login.loginStatus === 'success')
			history.push('/admin/dashboard')
	}, [login.loginStatus, history])

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(AuthActions.login(login))
	}

	return (
		<section className={s.login}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className={classNames('container', s.login_container)}>
				<div className={s.login_wrapper}>
					<Title styleName={s.login_title}>
						Вхід в панель керування
					</Title>
					<Form
						handler={handleSubmit}>
						<Input
							type='email'
							name='email'
							title='Введіть логін'
							value={login.email}
							onChange={e => dispatch(AuthActions.handleChange(e))}
							required />
						<Input
							type='password'
							name='password'
							title='Введіть пароль'
							value={login.password}
							onChange={e => dispatch(AuthActions.handleChange(e))}
							required />
					</Form>
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
