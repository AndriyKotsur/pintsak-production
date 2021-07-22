import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../../actions/login.action'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Logout = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	return (
		<button
			type="button"
			className={s.login_close}
			onClick={() => {
				dispatch(AuthActions.logout())
				history.push('/admin')
			}}>
			<Icon name="logout" className={classNames('icon', 'icon-logout', s.login_icon)} />
			Вийти
		</button>
	)
}

export default Logout
