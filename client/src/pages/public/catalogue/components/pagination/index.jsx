import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Pagination = ({ page, pages, handlePageBy }) => {
	const handlePageChange = e => {
		const targetPage = e.target.closest('button').dataset.page

		switch (targetPage) {
			case 'next':
				handlePageBy(page + 1)
				break;
			case 'previous':
				handlePageBy(page - 1)
				break;
			default:
				handlePageBy(Number(e.target.dataset.page))
		}
	}

	const paginationItems = [],
		delta = 2,
		left = page - delta,
		right = page + delta + 1

	for (let i = 1; i <= pages; i++) {
		if ((i >= left && i < right) || i === 1 || i === pages) {
				paginationItems.push(
					<button
						key={i}
						className={classNames(s.pagination_page, { [s.active]: page === i })}
						data-page={i}
						onClick={handlePageChange}>
						{i}
					</button>
				)
		} else if (i === right || i === left - 1) {
			paginationItems.push(
				<button
					key={i}
					className={s.pagination_page}>
					...
				</button>
			)
		}
	}

	return (
			<Fragment>
				{ pages > 1 &&
					<div className={s.pagination}>
						<div className={s.pagination_container}>
							<button
								className={classNames(s.pagination_step, { [s.disabled]: page <= 1 })}
								data-page='previous'
								onClick={handlePageChange}
								disabled={page < 1}>
								<Icon name='pagination' className={classNames('icon', 'icon-pagination', s.icon_left)} />
							</button>
							<div className={s.pages}>
								{paginationItems}
							</div>
							<button
								className={classNames(s.pagination_step, { [s.disabled]: page === pages })}
								data-page='next'
								onClick={handlePageChange}
								disabled={page === pages}>
								<Icon name='pagination' className={classNames('icon', 'icon-pagination', s.icon_right)} />
							</button>
						</div>
					</div> }
		</Fragment>
	)
}

Pagination.propTypes = {
	page: PropTypes.number,
	pages: PropTypes.number,
  handlePageChange: PropTypes.func,
}

Pagination.defaultProps = {
	page: null,
	pages: null,
  handlePageChange: () => null
}
export default Pagination
