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
                    <th>Шт на 1 м2</th>
                    <th>Вага на 1 м2</th>
                </tr>
                </thead>
                <tbody className={s.body}>
                <tr>
                    <td>{options.thickness}</td>
                    <td>{options.width}х{options.height}</td>
                    <td>{options.pieces_per_meter}</td>
                    <td>{options.weight_per_meter}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
