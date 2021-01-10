import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'
import s from './style.module.scss'

const TilesList = ({ tiles }) => {
	const history = useHistory()
	const onDeleteTile = async id => {
		await HTTP.deleteTile(id)
		window.location = '/admin/main/tile'
	}
	return (
		<>
			<ul>
				{tiles && tiles.map(tile => (
					<li key={tile.id} className="product-item">
						<Link to={`/tiles/${tile.id}`} className="product-link" target="_blank" rel="noopener noreferrer">
							<h3 className="product__title">{tile.title}</h3>
							<div className={s.image}>
								<img src={tile.images[0]} alt="Product alt" className="product__image"/>
							</div>
						</Link>
						<div className="product-order">
							<button onClick={() => history.push(`/admin/edit/tile/${tile.id}`)} className="product__btn--add">
            Редагувати
							</button>
							<button onClick={() => {onDeleteTile(tile.id)}} className="product__btn--remove">
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