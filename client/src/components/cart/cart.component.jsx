import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Counter } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Cart = () => {
	return (
		<div className={s.section}>
			<div className={s.wrapper}>
				<div className={s.head}>
					<h2 className={s.head_title}>Товари в кошику</h2>
					<button className={s.head_close} type="button">
						<Icon name="close" className="icon icon-close--big" />
					</button>
				</div>
				<div className={s.description}>
					<span className={s.description_item}>Кількість, м<sup>2</sup></span>
					<span className={s.description_item}>Ціна, грн</span>
					<span className={s.description_item}>Сума, грн</span>
				</div>
				<div className={s.list}>
					<div className={s.item}>
						<div className={s.item_wrapper}>
							<button className={s.item_close} type="button">
								<Icon name="close" className="icon icon-close--small" />
							</button>
							<picture className={s.item_image}>
								<img src="" alt="Product image" />
							</picture>
							<div className={s.item_text}>
								<Link to="" className={s.item_type}>Дорожні блоки та плити</Link>
								<Link to="" className={s.item_title}>Бордюр парковий поворотний</Link>
							</div>
						</div>
						<div className={s.item_total}>
							<Counter />
							<div className={s.item_coast}>
								<span className={s.item_price}>120,<sup>00</sup></span>
								<span className={s.item_summary}>1200,<sup>00</sup></span>
							</div>
						</div>
					</div>
				</div>
				<div className={s.order}>
					<div className={s.back}>
						<span className={s.back_text}>Продовжити покупки</span>
						<button className={s.back_btn}>
							<Icon name="arrow" className="icon icon-arrow" />
						</button>
					</div>
					<div className={s.total}>
						<div className={s.coast}>
							<span className={s.total}>Підсумок</span>
							<span className={s.summary}>199980,<sup>00 грн</sup></span>
						</div>
						<button className={s.btn}>Замовити</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart