import React from 'react'
import { Link } from 'react-router-dom'

import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Pagination = () => {
	return (
		<div className={s.wrapper}>
			<Link to="" className={s.refresh}>
				<Icon name="refresh" className={classNames('icon', 'icon-refresh', s.icon_refresh)} />
        Показати ще 12 товарів
			</Link>
			<div className={s.block}>
				<Link href="#" className={s.step}>
					<Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_left)} />
				</Link>
				<div className={s.pages}>
					<Link to="" className={s.page}>1</Link>
				</div>
				<Link to="" className={s.step}>
					<Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_right)} />
				</Link>
			</div>
		</div>
	)
}

export default Pagination