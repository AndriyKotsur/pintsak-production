import React, {Fragment} from 'react'

import {Tile} from 'components'

import s from './style.module.scss'

const Tiles = ({tiles, settings}) => {
    return (
        <Fragment>
            {settings && settings.edit && <span className={s.length}>Кількість продуктів: {tiles.length}</span>}
            <div className={s.wrapper}>
                {tiles.length > 0 && tiles.map(tile => (<Tile tile={tile} settings={settings} />))}
            </div>
        </Fragment>
    )
}

export default Tiles
