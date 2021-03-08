import React from 'react'

import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Carousel = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<h2 className={s.title}>Популярні товари</h2>
				<div className={s.controls}>
					<span className={s.step}>
						<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.arrow_left)} />
					</span>
					<span className={s.step}>
						<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.arrow_right)} />
					</span>
				</div>
			</div>
			<div className={s.block}></div>
		</div>
	)
}

export default Carousel