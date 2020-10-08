import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../../store/actions'

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
