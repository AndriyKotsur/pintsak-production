// @ts-nocheck
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'

const AdminLogin = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const login = useSelector(state => state.login)

	useEffect(() => {
		if (login.loginStatus === 'success')
			history.push('/admin/main')
	}, [login.loginStatus])

	const onSubmit = e => {
		e.preventDefault()
		dispatch(AuthActions.login(login))
	}

	return (
		<div className="contact-us">
			<div className="container">
				<div className="contact-us-inner">
					<h2 className="contact-us__title">
						Вхід в профіль
					</h2>
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
						<p className="contact-us__required">обов’язкові поля</p>
						<button type="submit" className="contact-us__btn">Увійти</button>
					</form>
					{login.loginStatus === 'error' && (
						<div style={{color: 'red'}}>не правильні логін або пароль</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminLogin
