import React from 'react'
import s from './style.module.scss'
import classNames from 'classnames'

import BackgroundLeft from 'assets/images/background-left.png'
import BackgroundRight from 'assets/images/background-right.png'

const Background = ({ settings: { hiddenLeft, hiddenRight } }) => {
	return (
		<div className={s.wrapper}>
			<picture className={classNames(s.left, { [s.hidden]: hiddenLeft })}>
				<img src={BackgroundLeft} alt="Background" />
			</picture>
			<picture className={classNames(s.right, { [s.hidden]: hiddenRight })}>
				<img src={BackgroundRight} alt="Background" />
			</picture>
		</div>
	)
}

export default Background