import React, { useEffect } from 'react'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Popup = ({ message, status, handleReset }) => {
	let statusClass = classNames(s.section, {
		[s.default]: !status,
		[s.error]: status === 'error',
		[s.success]:  status === 'success',
	})
	
	useEffect(() => {
		if(status) {
			setTimeout(() => {
				// Reset state to initial values 
				handleReset()
			}, 5000)
		}
	}, [status])

	return (
		<div className={statusClass}>
			<div className={s.wrapper}>
				<span className={s.title}>
					{message}
				</span>
			</div>
			<button
				type="button"
				className={s.close}
				onClick={handleReset}>
				<Icon name="close" className="icon icon-close--popup" />
			</button>
		</div>
	)
}

export default Popup