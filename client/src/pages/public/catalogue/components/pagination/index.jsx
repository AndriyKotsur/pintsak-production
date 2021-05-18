import React, { Fragment } from 'react'

import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Pagination = ({ page, pages, handlePageBy }) => {
    const handlePageChange = (e) => {
        switch (e.target.closest('button').dataset.page) {
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

    const items = [],
        delta = 2,
        left = page - delta,
        right = page + delta + 1

    for (let i = 1; i <= pages; i++) {
        if ((i >= left && i < right) || i === 1 || i === pages) {
            items.push(
                <button
                    key={i}
                    className={classNames(s.page, { [s.active]: page === i })}
                    data-page={i}
                    onClick={handlePageChange}>
                    {i}
                </button>
            )
        } else if (i === right || i === left - 1) {
            items.push(
                <button
                    key={i}
                    className={s.page}>
                    ...
                </button>
            )
        }
    }

    return (
        <Fragment>
            {
                pages > 1 &&
                <div className={s.wrapper}>
                    <button className={s.refresh}>
                        <Icon name="refresh" className={classNames('icon', 'icon-refresh', s.icon_refresh)} />
                        Показати ще 12 товарів
                    </button>
                    <div className={s.block}>
                        <button
                            className={classNames(s.step, { [s.disabled]: page <= 1 })}
                            data-page="previous"
                            onClick={handlePageChange}
                            disabled={page < 1}>
                            <Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_left)} />
                        </button>
                        <div className={s.pages}>
                            {items}
                        </div>
                        <button
                            className={classNames(s.step, { [s.disabled]: page === pages })}
                            data-page="next"
                            onClick={handlePageChange}
                            disabled={page === pages}>
                            <Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_right)} />
                        </button>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Pagination
