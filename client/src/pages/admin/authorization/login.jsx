// @ts-nocheck
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'
import { Background, Input } from 'components'
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

	const onSubmit = e => {
		e.preventDefault()
		dispatch(AuthActions.login(login))
	}

	return (
		<section className={s.authorization}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }}/>
			<div className={classNames('container', s.container)}>
				<div className={s.inner}>
					<h1 className={s.title}>
						Вхід в панель керування
					</h1>
					<form onSubmit={e => onSubmit(e)}
						className={s.form}>
						<Input
							type='email'
							name='email'
							value={login.email}
							title='Введіть логін *'
							onChange={e => dispatch(AuthActions.handleChange(e))}
							isRequired />
						<Input
							type='password'
							name='password'
							value={login.password}
							title='Введіть пароль *'
							onChange={e => dispatch(AuthActions.handleChange(e))}
							isRequired />
						<button
							type="submit"
							className={classNames('btn-sent', 'btn-orange', s.btn)}
						>Увійти
						</button>
					</form>
					{
						login.loginStatus === 'error' && (
							<span className={s.error}>Не правильний логін або пароль :(</span>)
					}
				</div>
			</div>
		</section>
	)
}

export default Login
