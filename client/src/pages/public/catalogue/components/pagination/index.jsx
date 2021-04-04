import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import {Icon} from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Pagination = ({page, pages, handlePageBy}) => {
    return (
        <Fragment>
            {
                pages > 1 &&
                <div className={s.wrapper}>
                    <Link to="" className={s.refresh}>
                        <Icon name="refresh" className={classNames('icon', 'icon-refresh', s.icon_refresh)}/>
                        Показати ще 12 товарів
                    </Link>
                    <div className={s.block}>
                        <button className={classNames(s.step, {[s.disabled]: page <= 1})}
                                onClick={() => handlePageBy(page - 1)}
                                disabled={page <= 1}>
                            <Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_left)}/>
                        </button>
                        <div className={s.pages}>
                            <Link to="" className={s.page}>1</Link>
                        </div>
                        <button className={classNames(s.step, {[s.disabled]: page >= pages})}
                                onClick={() => handlePageBy(page + 1)}
                                disabled={page >= pages}>
                            <Icon name="pagination" className={classNames('icon', 'icon-pagination', s.icon_right)}/>
                        </button>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Pagination
