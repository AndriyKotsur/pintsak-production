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
	}, [login.loginStatus])

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(AuthActions.login(login))
	}

	return (
		<section className={s.section}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className={classNames('container', s.container)}>
				<div className={s.wrapper}>
					<Title value="Вхід в панель керування" />
					<Form
						handler={handleSubmit}>
						<Input
							type='email'
							name='email'
							title='Введіть логін'
							value={login.email}
							onChange={e => dispatch(AuthActions.handleChange(e))}
							isRequired />
						<Input
							type='password'
							name='password'
							title='Введіть пароль'
							value={login.password}
							onChange={e => dispatch(AuthActions.handleChange(e))}
							isRequired />
					</Form>
					{ login.loginStatus === 'error' && ( <span className={s.error}>Не правильний логін або пароль!</span> ) }
				</div>
			</div>
		</section>
	)
}

export default Login
