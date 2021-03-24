import React from 'react'
import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Counter = () => {
	return (
		<div className={s.wrapper}>
			<button className={s.remove}>
				<Icon name='minus' className='icon icon-minus' />
			</button>
			<input type="number" className={s.count} min="1" value="1" />
			<button className={s.add}>
				<Icon name='plus' className='icon icon-plus' />
			</button>
			<span className={s.size}>м<sup>2</sup></span>
		</div>
	)
}

export default Counter