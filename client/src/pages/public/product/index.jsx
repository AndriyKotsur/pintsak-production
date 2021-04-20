import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as CartActions from 'actions/cart-action'
import * as GetTileActions from 'actions/get-tile.action'

import { Icon, Preloader, Counter, Carousel, Cart } from 'components'
import Breadcrumbs from './components/breadcrumbs'
import Gallery from './components/gallery'
import Table from './components/table'

import classNames from 'classnames'
import s from './style.module.scss'

const ProductPage = () => {
	const dispatch = useDispatch()
	const { url } = useParams()
	const tile = useSelector(tile => tile.getTile)
	const cart = useSelector(state => state.cart)
	const itemInCart = cart.items.find(item => item.url === url)

	const [quantity, setQuantity] = useState(1)
	const [variant, setVariant] = useState('grey')

	const handleCart = () => {
		dispatch(CartActions.addCartItem(tile, quantity, variant))
		dispatch(CartActions.handleCart(true))
	}

	useEffect(() => {
		dispatch(GetTileActions.getTile(url))
	}, [])

	return (
		<div className={s.section}>
			{tile.get_tile_status === 'loading' && <Preloader/>}
			{tile.get_tile_status === 'success' && tile.get_tile_status && (
				<div className="container">
					<div className={s.wrapper}>
						<button type="button" onClick={() => window && window.history.back()} className={s.back}>
							<Icon name='arrow' className={classNames('icon', 'icon-back', s.back_icon)}/>
							{tile.title}
						</button>
						<Breadcrumbs type={tile.type} tile={tile.title}/>
						<div className={s.product}>
							<span className={classNames(s.status, { [s.available]: tile.is_available })}>{tile.is_available ? 'В наявності' : 'Нема у наявності'}</span>
							<Gallery images={tile.images}/>
							<div className={s.product_block}>
								<div className={s.product_wrapper}>
									<h1 className={s.product_title}>{tile.title}</h1>
									<p className={s.product_price}>{tile.prices.grey},<sup> 00 грн</sup></p>
									<Counter
										type="product"
										id={tile._id}
										quantity={itemInCart ? itemInCart.quantity : quantity}
										handleQuantity={!itemInCart && setQuantity} />
									<button
										onClick={handleCart}
										className={classNames('btn-green', 'btn-cart', s.product_btn, { [s.disabled]: !tile.is_available })}
										disabled={!tile.is_available}>
										<Icon name='cart' className={classNames('icon', 'icon-cart', s.product_icon)}/>
										В кошик
									</button>
								</div>
							</div>
						</div>
						<Table options={tile.sizes}/>
						<Carousel items={tile.tiles} styleName={s.carousel}/>
					</div>
				</div>
			)}
			{cart.is_active && <Cart />}
		</div>
	)
}

export default ProductPage
