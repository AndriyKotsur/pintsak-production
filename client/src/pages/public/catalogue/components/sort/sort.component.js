import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Sort = () => {
	const [sortByWidth, setSortByWidth] = useState(false)
	const [sortByPrice, setSortByPrice] = useState(false)

	return (
		<div className={s.wrapper}>
			<span className={s.title}>Сортування:</span>
			<div className={s.block}>
				<Link
					to={`?sort=width&order=${sortByWidth ? 'ASC' : 'DESC'}`}
					className={s.size}
					onClick={() => setSortByWidth(!sortByWidth)} >
          за розміром
					<Icon name='dropdown' className={classNames('icon', 'icon-sort', {[s.active]: sortByWidth})} />
				</Link>
				<Link
					to={`?sort=price&order=${sortByPrice ? 'ASC' : 'DESC'}`}
					className={s.price}
					onClick={() => setSortByPrice(!sortByPrice)}>
          за ціною
					<Icon name='dropdown' className={classNames('icon', 'icon-sort', {[s.active]: sortByPrice})} />
				</Link>
			</div>
		</div>
	)
}

export default Sort