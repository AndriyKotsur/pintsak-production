import React from 'react'
import PropTypes from 'prop-types'

import { Tile } from 'components'

import s from './style.module.scss'

const Tiles = ({ tiles, settings }) => {
	return (
		<div className={s.tiles}>
			{settings && settings.edit && <div className={s.tiles_quantity}>
				Кількість продуктів: <span>{tiles.length}</span>
			</div>}
			<div className={s.tiles_wrapper}>
				{tiles && tiles.length > 0 && tiles.map((tile, index) => (<Tile key={'tile_'+ index}  tile={tile} settings={settings} />))}
			</div>
		</div>
	)
}

Tiles.propTypes = {
	tiles: PropTypes.any,
	settings: PropTypes.any,
}

Tiles.defaultProps = {
	tiles: [],
	settings: {},
}
export default Tiles
