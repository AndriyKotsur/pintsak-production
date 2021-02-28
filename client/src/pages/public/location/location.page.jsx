import React from 'react'
import { Icon } from 'components'
import s from './style.module.scss'
import classNames from 'classnames'

const LocationPage = () => {
	return(
		<div className={s.section}>
			<div className={s.container}>
				<div className={s.wrapper}>
					<div className={s.info}>
						<div className={s.block}>
							<div className={s.item}>
								<Icon name="location" className={'icon', 'icon-location'} />
								<span className={s.title}>Адреса</span>
							</div>
							<p className={s.text}>Великий Березний вул. Верховинська, 10</p>
						</div>
						<div className={s.block}>
							<div className={s.item}>
								<Icon name="phone" className={'icon', 'icon-phone'} />
								<span className={s.title}>Телефон</span>
							</div>
							<p className={s.text}>+380636666666</p>
						</div>
						<div className={s.block}>
							<div className={s.item}>
								<Icon name="clock" className={'icon', 'icon-clock'} />
								<span className={s.title}>Час роботи</span>
							</div>
							<p className={s.text}>Пн-Сб / 9:00 - 20:00</p>
						</div>
					</div>
				</div>
				<div className={s.map}>
					<h2 className={s.map_title}>Ми знаходимося тут</h2>
					<iframe className={s.map_item}
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20985.13348299062!2d22.445753894112872!3d48.89363688983936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473969dd21b78947%3A0x626f5d1fd5a46e04!2sVelykyi%20Bereznyi%2C%20Zakarpattia%20Oblast%2C%2089000!5e0!3m2!1sen!2sua!4v1590767813682!5m2!1sen!2sua"
						allowFullScreen width="600" height="400">
					</iframe>
				</div>
			</div>
		</div>
	)
}

export default LocationPage