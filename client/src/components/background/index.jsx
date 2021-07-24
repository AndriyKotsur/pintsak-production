import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

import backgroundLeft from 'assets/images/background-left.png'
import backgroundRight from 'assets/images/background-right.png'

const Background = ({ settings: { hiddenLeft, hiddenRight } }) => {
	return (
		<div className={s.background}>
			<picture className={classNames(s.background_left, { [s.hidden]: hiddenLeft })}>
				<img src={backgroundLeft} alt="Tiles background" />
			</picture>
			<picture className={classNames(s.background_right, { [s.hidden]: hiddenRight })}>
				<img src={backgroundRight} alt="Tiles background" />
			</picture>
		</div>
	)
}

export default Background