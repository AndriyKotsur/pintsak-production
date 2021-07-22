import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTileActions from 'actions/get-tile.action'

import { Icon, Carousel, Cart, Preloader } from 'components'
import Breadcrumbs from './components/breadcrumbs'
import Gallery from './components/gallery'
import Card from './components/card'
import Table from './components/table'

import classNames from 'classnames'
import './slider.scss'
import s from './style.module.scss'

const ProductPage = () => {
	const dispatch = useDispatch()
	const tile = useSelector(tile => tile.getTile)
	const cart = useSelector(state => state.cart)

	const { url } = useParams()

	useEffect(() => {
		dispatch(GetTileActions.getTile(url))
	}, [dispatch, url])

	return (
		<section className={s.product}>
			{tile.get_tile_status === 'loading' && <Preloader />}
			{tile.get_tile_status === 'success' && tile.get_tile_status && (
				<div className='container'>
					<div className={s.product_wrapper}>
						<button type='button' onClick={() => window && window.history.back()} className={s.product_back}>
							<Icon name='arrow' className={classNames('icon', 'icon-back', s.product_icon)} />
							{tile.title}
						</button>
						<Breadcrumbs type={tile.type} tile={tile.title} />
						<div className={s.product_container}>
							<span className={classNames(s.product_status, { [s.available]: tile.is_available })}>
								{tile.is_available ? 'В наявності' : 'Нема у наявності'}
							</span>
							<Gallery images={tile.images} />
							<Card tile={tile} cart={cart} />
						</div>
						<Table options={tile.sizes} />
						{tile.tiles.length >= 3 && <Carousel items={tile.tiles} styleName={classNames(s.product_carousel, 'product_slider')} />}
					</div>
				</div>
			)}
			{cart.is_active && <Cart />}
		</section>
	)
}

export default ProductPage
