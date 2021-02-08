import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'
import s from './style.module.scss'

const TilesList = ({ tiles }) => {
	const history = useHistory()
	const onDeleteTile = async id => {
		await HTTP.deleteTile(id)
		window.location = '/admin/dashboard'
	}
	return (
		<>
			<ul className={s.list}>
				{tiles && tiles.map(tile => (
					<li key={tile.id} className={s.item}>
						<Link to={`/tiles/${tile.id}`} className={s.link}>
							<h3 className={s.title}>{tile.title}</h3>
							<picture className={s.image}>
								<img src={tile.images[0]} alt={tile.title} />
							</picture>
						</Link>
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
					</li>
				))}
			</ul>
		</>
	)
}

export default TilesList