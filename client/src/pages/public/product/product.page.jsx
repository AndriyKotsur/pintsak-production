import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Counter, Carousel } from 'components'
import Breadcrumbs from './components/breadcrumbs/breadcrumbs.component'
import Table from './components/table/table.component'

import classNames from 'classnames'
import s from './style.module.scss'

const ProductPage = () => {
	return (
		<div className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<Link to="" className={s.back}>
						<Icon name='arrow' className={classNames('icon', 'icon-back', s.back)} />
            Тротуарна
					</Link>
					<Breadcrumbs type="Тротуарна плитка" tile="Тротуарна" />
					<div className={s.product}>
						<span className={s.status}>В наявності</span>
						<div className={s.gallery}>
							<div className={s.gallery_small}>
								<picture className={s.image_small}>
									<img src="" alt="Gallery image" />
								</picture>
							</div>
							<div className={s.gallery_large}>
								<picture className={s.image_large}>
									<img src="" alt="Gallery image" />
								</picture>
							</div>
						</div>
						<div className={s.product_block}>
							<div className={s.product_wrapper}>
								<h1 className={s.product_title}>Коврова</h1>
								<p className={s.product_price}>190,<sup> 00 грн</sup></p>
								<Counter />
								<Link to="/order" className={classNames('btn-green', 'btn-cart', s.product_btn)}>
									<Icon name='cart' className='icon icon-cart' />
                  В кошик
								</Link>
							</div>
						</div>
					</div>
					<Table />
					<Carousel />
				</div>
			</div>
		</div>
	)
}

export default ProductPage