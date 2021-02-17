import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Preloader = () => {
	return (
		<div className={s.preloader}>
			<div className={classNames(s.item, s.one)}></div>
			<div className={classNames(s.item, s.two)}></div>
			<div className={classNames(s.item, s.three)}></div>
			<div className={classNames(s.item, s.four)}></div>
			<div className={classNames(s.item, s.five)}></div>
			<div className={classNames(s.item, s.six)}></div>
			<div className={classNames(s.item, s.seven)}></div>
			<div className={classNames(s.item, s.eight)}></div>
			<div className={classNames(s.item, s.nine)}></div>
		</div>
	)
}

export default Preloader