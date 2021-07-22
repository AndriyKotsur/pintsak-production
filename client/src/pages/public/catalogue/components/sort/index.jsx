import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Sort = ({ sortBy, orderBy, handleSortBy, handleOrderBy }) => {
	const defaultSortBySize = 'sizes.width'
	const defaultSortByPrice = 'default_color.v'

	return (
		<div className={s.sort}>
			<span className={s.sort_title}>
				Сортування:
			</span>
			<div className={s.sort_container}>
				<button
					type='button'
					className={classNames(s.sort_size, { [s.active]: sortBy === defaultSortBySize && orderBy === 1 })}
					onClick={() => {
						handleSortBy(defaultSortBySize)
						handleOrderBy(prev => prev === 1 ? -1 : 1)
					}}>
					за розміром
					<Icon
						name='dropdown'
						className={classNames('icon', 'icon-sort', s.sort_icon, { [s.active]: sortBy === defaultSortBySize && orderBy === 1 })} />
				</button>
				<button
					type='button'
					className={classNames(s.sort_price,{ [s.active]: sortBy === defaultSortByPrice && orderBy === 1 })}
					onClick={() => {
						handleSortBy(defaultSortByPrice)
						handleOrderBy(prev => prev === 1 ? -1 : 1)
					}}>
					за ціною
					<Icon
						name='dropdown'
						className={classNames('icon', 'icon-sort', s.sort_icon, { [s.active]: sortBy === defaultSortByPrice && orderBy === 1 })} />
				</button>
			</div>
		</div>
	)
}

Sort.propTypes = {
	sortBy: PropTypes.string,
	orderBy: PropTypes.number,
  handleSortBy: PropTypes.func,
  handleOrderBy: PropTypes.func
}

Sort.defaultProps = {
	sortBy: '',
	orderBy: null,
  handleSortBy: () => null,
  handleOrderBy: () => null
}
export default Sort
