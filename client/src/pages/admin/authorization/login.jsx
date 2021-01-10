// @ts-nocheck
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'
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
			<div className={classNames('container', s.container)}>
				<div className={s.inner}>
					<h1 className={s.title}>
						Вхід в панель керування
					</h1>
					<form onSubmit={e => onSubmit(e)} className="form contact-us-form">
						<div className="input-field contact-us-field">
							<input
								type="email"
								name="email"
								value={login.email}
								onChange={e => dispatch(AuthActions.handleChange(e))}
								className="input contact-us__input"
								required
							/>
							<label className="label contact-us__label">Логін</label>
						</div>
						<div className="input-field contact-us-field">
							<input
								type="password"
								name="password"
								value={login.password}
								onChange={e => dispatch(AuthActions.handleChange(e))}
								className="input contact-us__input"
								required
							/>
							<label className="label contact-us__label">Пароль</label>
						</div>
						<p className={s.required}>обов’язкові поля</p>
						<button
							type="submit"
							className={classNames('btn-sent', 'btn-orange', s.btn)}
						>Увійти
						</button>
					</form>
					{
						login.loginStatus === 'error' && (
							<div style={{color: 'red'}}>Не правильний логін або пароль :(</div>)
					}
				</div>
			</div>
		</section>
	)
}

export default Login
