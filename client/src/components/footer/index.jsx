import React from 'react'
import { Icon } from 'components'

import s from './style.module.scss'

const Footer = () => {
	return(
		<footer className={s.footer}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.block}>
						<div className={s.item}>
							<Icon name="location" className="icon icon-location" />
							<span className={s.title}>Адреса</span>
						</div>
						<span className={s.text}>Великий Березний вул. Верховинська, 10</span>
					</div>
					<div className={s.block}>
						<div className={s.item}>
							<Icon name="phone" className="icon icon-phone" />
							<span className={s.title}>Телефон</span>
						</div>
						<span className={s.text}>+380636666666</span>
					</div>
					<div className={s.block}>
						<div className={s.item}>
							<Icon name="clock" className="icon icon-clock" />
							<span className={s.title}>Час роботи</span>
						</div>
						<span className={s.text}>Пн-Сб / 9:00 - 20:00</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
