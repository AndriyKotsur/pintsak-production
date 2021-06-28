import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart-action'
import * as DeleteTileActions from 'actions/delete-tile.action'

import { Icon, Counter } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const Tile = ({ tile, settings }) => {
	const [quantity, setQuantity] = useState(1)

	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.deleteTile)
	const cart = useSelector(state => state.cart)

	const itemInCart = cart.items.find(item => item.url === tile.url)

	const handleCart = () => {
		if(!itemInCart) dispatch(CartActions.addCartItem(tile, quantity, Object.keys(tile.prices)[0]))
		dispatch(CartActions.handleCart(true))
	}

	const handleDelete = async id => {
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
				<span className={s.price}>{Object.values(tile.prices)[0]}</span>
			</Link>
			{ settings && settings.edit ?
				<div className={s.action}>
					<button
						type="button"
						onClick={() => history.push(`/admin/tile/${tile.url}`)}
						className={s.edit}>
							Редагувати
					</button>
					<button
						type="button"
						onClick={() => {handleDelete(tile._id)}}
						className={s.delete}>
							Видалити
					</button>
				</div>
				:
				<div className={s.action}>
					<Counter
						id={tile.id}
						type="catalogue"
						disabled={itemInCart}
						measurement={tile.sizes.measurement}
						quantity={itemInCart ? itemInCart.quantity : quantity}
						handleQuantity={!itemInCart && setQuantity} />
					<button
						type="button"
						onClick={handleCart}
						className={classNames(s.cart, {[s.added]: itemInCart})}>
							<Icon name='cart' className='icon icon-cart'/>
					</button>
				</div> }
		</div>
	)
}

export default Tile