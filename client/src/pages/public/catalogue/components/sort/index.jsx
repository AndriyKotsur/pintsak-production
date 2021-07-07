import React from 'react'
import { Icon } from 'components'
import classNames from 'classnames'
import s from './style.module.scss'

const Sort = ({ sortBy, orderBy, handleSortBy, handleOrderBy }) => {
    return (
        <div className={s.wrapper}>
            <span className={s.title}>Сортування:</span>
            <div className={s.block}>
                <button
                    className={classNames(s.size, { [s.active]: sortBy === 'sizes.width' && orderBy === 1 })}
                    onClick={() => {
                        handleSortBy('sizes.width')
                        handleOrderBy(prev => prev === 1 ? -1 : 1)
                    }}>
                    за розміром
                    <Icon name='dropdown'
                        className={classNames('icon', 'icon-sort', s.icon, { [s.active]: sortBy === 'sizes.width' && orderBy === 1 })} />
                </button>
                <button
                    className={classNames(s.price, { [s.active]: sortBy === 'default_color.v' && orderBy === 1 })}
                    onClick={() => {
                        handleSortBy('default_color.v')
                        handleOrderBy(prev => prev === 1 ? -1 : 1)
                    }}>
                    за ціною
                    <Icon name='dropdown'
                        className={classNames('icon', 'icon-sort', s.icon, { [s.active]: sortBy === 'default_color.v' && orderBy === 1 })} />
                </button>
            </div>
        </div>
    )
}

export default Sort
