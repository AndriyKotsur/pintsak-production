import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'
import s from './style.module.scss'

import { Icon } from 'components'

const Tiles = ({ tiles, settings }) => {
	const history = useHistory()
	const onDeleteTile = async id => {
		await HTTP.deleteTile(id)
		window.location = '/admin/dashboard'
	}

	return (
		<ul className={s.list}>
			{tiles && tiles.map(tile => (
				<li key={tile.id} className={s.item}>
					<Link to={`/tiles/${tile.id}`} className={s.link}>
						<h3 className={s.title}>{tile.title}</h3>
						<div className={s.wrapper}>
							<picture className={s.image}>
								<img src={tile.images[0]} alt={tile.title} />
							</picture>
						</div>
						<span className={s.size}>
							{tile.width} x {tile.height}
						</span>
						<span className={s.price}>
							{tile.color_price.grey}
						</span>
					</Link>
					{
						settings && settings.edit ?
							<div className={s.action}>
								<button
									onClick={() => history.push(`/admin/edit/tile/${tile.id}`)}
									className={s.edit}>
										Редагувати
								</button>
								<button
									onClick={() => {onDeleteTile(tile.id)}}
									className={s.delete}>
										Видалити
								</button>
							</div>
							:
							<div className={s.counter}>
								<button className={s.remove}>
									<Icon name='minus' className='icon icon-minus' />
								</button>
								<input type="number" className={s.count} min="1" value="1" />
								<button className={s.add}>
									<Icon name='plus' className='icon icon-plus' />
								</button>
								<button className={s.cart}>
									<Icon name='cart' className='icon icon-cart' />
								</button>
							</div>
					}
				</li>
			))}
		</ul>
	)
}

export default Tiles