import React, { useEffect, useState } from 'react'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Popup = ({ message, status, onChange }) => {
	const [currentStatus, setCurrentStatus] = useState('default')

	useEffect(() => {
		if (status) {
			setTimeout(() => {
				setCurrentStatus('')
				// Reset state from props function
				onChange()
			}, 5000)
		}
		// eslint-disable-next-line
	}, [status])

	return (
		<div className={classNames(s.section, {
			[s.error]: status === 'error' && currentStatus,
			[s.success]: status === 'success' && currentStatus
		})}>
			<div className={s.wrapper}>
				<span className={s.title}>
					{message}
				</span>
			</div>
			<button type="button" className={s.close} onClick={() => setCurrentStatus('')}>
				<Icon name="close" className="icon icon-close--popup" />
			</button>
		</div>
	)
}

export default Popup