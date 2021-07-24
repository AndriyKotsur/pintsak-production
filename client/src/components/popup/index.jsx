import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Popup = ({ message, status, handleReset }) => {
	let classes = classNames(s.section, {
		[s.default]: !status,
		[s.error]: status === 'error',
		[s.success]:  status === 'success',
	})
	
	useEffect(() => {
		if (status) {
			setTimeout(() => {
				// Reset state to initial values 
				handleReset()
			}, 5000)
		}
		// eslint-disable-next-line
	}, [status])

	return (
		<section className={classNames(s.popup, classes)}>
			<div className={s.popup_wrapper}>
				<span className={s.popup_title}>
					{message}
				</span>
			</div>
			<button
				type="button"
				className={s.popup_close}
				onClick={handleReset}>
				<Icon name="close" className="icon icon-close--popup" />
			</button>
		</section>
	)
}

Popup.propTypes = {
	message: PropTypes.string,
	status: PropTypes.string,
  handleReset: PropTypes.func
}

Popup.defaultProps = {
	message: '',
	status: '',
  handleReset: () => null
}
export default Popup