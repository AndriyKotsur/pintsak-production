import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'
import s from './style.module.scss'

const Logout = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	return (
		<button
			className={s.close}
			onClick={() => {
				dispatch(AuthActions.logout())
				history.push('/admin')
			}}>
			Вийти
		</button>
	)
}

export default Logout
