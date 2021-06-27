import React from 'react'

import s from './style.module.scss'

const Table = ({options}) => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Опис товару</h2>
            <table className={s.table}>
                <thead className={s.head}>
                <tr>
                    <th>Товщина (см)</th>
                    <th>Розмір (см)</th>
                    <th>Кількість на од. виміру</th>
                    <th>Вага / {options.measurement === 'Штука' ? 'шт.' : 'м2'}</th>
                </tr>
                </thead>
                <tbody className={s.body}>
                <tr>
                    <td>{options.thickness}</td>
                    <td>{options.width}х{options.height}</td>
                    <td>{options.quantity}</td>
                    <td>{options.weight}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
