import React from 'react'

import { Icon } from 'components'

import s from './style.module.scss'

const Advantages = () => {
	return (
		<section className={s.cons}>
			<div className='container'>
				<div className={s.cons_wrapper}>
					<div className={s.cons_item}>
						<h3 className={s.cons_title}>
							Доставка по регіону
						</h3>
						<div className={s.cons_image}>
							<Icon name='delivery' className='icon icon-delivery'/>
						</div>
					</div>
					<div className={s.cons_item}>
						<h3 className={s.cons_title}>
							Індивідуальний підхід
						</h3>
						<div className={s.cons_image}>
							<Icon name='approach' className='icon icon-approach'/>
						</div>
					</div>
					<div className={s.cons_item}>
						<h3 className={s.cons_title}>
							Лояльні ціни
						</h3>
						<div className={s.cons_image}>
							<Icon name='price' className='icon icon-price'/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Advantages
