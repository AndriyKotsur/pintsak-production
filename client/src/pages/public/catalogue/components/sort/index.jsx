import React from 'react'
import { Link } from 'react-router-dom'

import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Sort = ({ sortBy, orderBy, handleSortBy, handleOrderBy }) => {
	return (
		<div className={s.wrapper}>
			<span className={s.title}>Сортування:</span>
			<div className={s.block}>
				<button
					className={s.size}
					onClick={() => {
						handleSortBy('sizes.width')
						handleOrderBy(prev => prev === 1 ? -1 : 1)
					}} >
          за розміром
					<Icon name='dropdown' className={classNames('icon', 'icon-sort', s.icon, {[s.active]: sortBy === 'sizes.width' && orderBy == 1})} />
				</button>
				<button
					className={s.price}
					onClick={() => {
						handleSortBy('prices.grey')
						handleOrderBy(prev => prev === 1 ? -1 : 1)
					}}>
          за ціною
					<Icon name='dropdown' className={classNames('icon', 'icon-sort', sortBy === 'prices.grey' && orderBy === 1 && s.active)} />
				</button>
			</div>
		</div>
	)
}

export default Sort