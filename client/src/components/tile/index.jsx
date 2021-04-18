import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import * as DeleteTileActions from 'actions/delete-tile.action'

import { Counter } from "components"

import s from "./style.module.scss"

const Tile = ({ tile, settings }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state => state.deleteTile)

    const deleteTile = async id => {
        dispatch(DeleteTileActions.deleteTile(id))
    }

    useEffect(() => {
        if (state.delete_tile_status === 'success')
            window.location = '/admin/dashboard'
    }, [state])

    return (
        <div key={tile.id} className={s.item}>
            <Link to={`/catalogue/${tile.type.url}/${tile.url}`} className={s.link}>
                <h3 className={s.title}>{tile.title}</h3>
                <div className={s.wrapper}>
                    <picture className={s.image}>
                        <img src={tile.images[0]} alt={tile.title}/>
                    </picture>
                </div>
                <span className={s.size}>{tile.sizes.width} x {tile.sizes.height}</span>
                <span className={s.price}>{tile.prices.grey}</span>
            </Link>
            {
                settings && settings.edit ?
                    <div className={s.action}>
                        <button
                            onClick={() => history.push(`/admin/tile/${tile.url}`)}
                            className={s.edit}>
                            Редагувати
                        </button>
                        <button
                            onClick={() => {deleteTile(tile._id)}}
                            className={s.delete}>
                            Видалити
                        </button>
                    </div>
                    :
                    <Counter id={tile.id} type="catalogue" />
            }
        </div>
    )
}

export default Tile
