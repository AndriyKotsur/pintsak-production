import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'

const AdminLogout = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	return (
		<button onClick={() => {
			dispatch(AuthActions.logout())
			history.push('/admin')
		}}>Вийти</button>
	)
}

export default AdminLogout
