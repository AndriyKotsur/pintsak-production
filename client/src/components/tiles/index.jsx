import React from 'react'

import {Tile} from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Tiles = ({tiles, settings, styleName}) => {
    return (
        <div className={classNames(styleName)}>
            {settings && settings.edit && <span className={s.length}>Кількість продуктів: {tiles.length}</span>}
            <div className={s.list}>
                {tiles.length > 0 && tiles.map(tile => (<Tile tile={tile} settings={settings} />))}
            </div>
        </div>
    )
}

export default Tiles
