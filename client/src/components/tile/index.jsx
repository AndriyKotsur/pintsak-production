import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart.action'
import * as DeleteTileActions from 'actions/delete-tile.action'

import { Icon, Counter } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Tile = ({ tile, settings }) => {
	const [quantity, setQuantity] = useState(1)

	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.deleteTile)
	const cart = useSelector(state => state.cart)

	const itemInCart = cart.items.find(item => item.url === tile.url)

	let classes = {
		[s.added]: itemInCart,
		[s.disabled]: !tile.is_available
	}

	const handleCart = () => {
		if (!itemInCart) dispatch(CartActions.addCartItem(tile, quantity, Object.keys(tile.prices)[0]))
		dispatch(CartActions.handleCart(true))
	}

	const handleDeleteItem = async id => {
		dispatch(DeleteTileActions.deleteTile(id))
	}

	useEffect(() => {
		if (state.delete_tile_status === 'success')
			window.location = '/admin/dashboard'
	}, [state])
	
	return (
		<div key={tile.id} className={s.item}>
			<Link to={`/catalogue/${tile.type.url}/${tile.url}`} className={s.item_link}>
				<h3 className={s.item_title}>
					{tile.title}
				</h3>
				<div className={s.item_wrapper}>
					<picture className={s.item_image}>
						<img src={tile.images[0]} alt={tile.title} />
					</picture>
				</div>
				<span className={s.item_size}>
					{tile.sizes.width} x {tile.sizes.height}
				</span>
				<span className={s.item_price}>
					{Object.values(tile.prices)[0]}
				</span>
			</Link>
			{ settings && settings.edit ?
				<div className={s.item_control}>
					<button
						type="button"
						onClick={() => history.push(`/admin/tile/${tile.url}`)}
						className={s.control_edit}>
						Редагувати
					</button>
					<button
						type="button"
						onClick={() => { handleDeleteItem(tile._id) }}
						className={s.control_delete}>
						Видалити
					</button>
				</div>
				:
				<div className={s.item_control}>
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
						disabled={!tile.is_available}
						className={classNames(s.item_cart, classes)}>
						<Icon name='cart' className='icon icon-cart' />
					</button>
				</div> }
		</div>
	)
}

Tile.propTypes = {
	tile: PropTypes.any,
	settings: PropTypes.any,
}

Tile.defaultProps = {
	tile: {},
	settings: {},
}
export default Tile