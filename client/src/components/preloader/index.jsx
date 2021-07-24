import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Preloader = ({ background }) => {
	return (
		<div className={classNames(s.preloader, {[s.background]: background})}>
			<div className={s.preloader_background}></div>
			<div className={s.preloader_container}>
				<div className={classNames(s.preloader_item, s.one)}></div>
				<div className={classNames(s.preloader_item, s.two)}></div>
				<div className={classNames(s.preloader_item, s.three)}></div>
				<div className={classNames(s.preloader_item, s.four)}></div>
				<div className={classNames(s.preloader_item, s.five)}></div>
				<div className={classNames(s.preloader_item, s.six)}></div>
				<div className={classNames(s.preloader_item, s.seven)}></div>
				<div className={classNames(s.preloader_item, s.eight)}></div>
				<div className={classNames(s.preloader_item, s.nine)}></div>
			</div>
		</div>
	)
}

Preloader.propTypes = {
	background: PropTypes.bool,
}

Preloader.defaultProps = {
	background: false,
}
export default Preloader