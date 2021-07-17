import React from 'react'
import { Icon } from 'components'

import s from './style.module.scss'

const Footer = () => {
	return(
		<footer className={s.footer}>
			<div className='container'>
				<div className={s.footer_wrapper}>
					<div className={s.footer_block}>
						<div className={s.footer_item}>
							<Icon name='location' className='icon icon-location' />
							<span className={s.footer_title}>Адреса</span>
						</div>
						<span className={s.footer_text}>Великий Березний вул. Верховинська, 10</span>
					</div>
					<div className={s.footer_block}>
						<div className={s.footer_item}>
							<Icon name='phone' className='icon icon-phone' />
							<span className={s.footer_title}>Телефон</span>
						</div>
						<a href='tel:+380995125826' className={s.footer_text}>+380995125826</a>
					</div>
					<div className={s.footer_block}>
						<div className={s.footer_item}>
							<Icon name='clock' className='icon icon-clock' />
							<span className={s.footer_title}>Час роботи</span>
						</div>
						<span className={s.footer_text}>Пн-Сб / 9:00 - 20:00</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
