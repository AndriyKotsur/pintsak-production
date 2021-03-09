import React from 'react'
import { Icon } from 'components'

import s from './style.module.scss'

const Popup = () => {
	return (
		<div className={s.section}>
			<div className={s.wrapper}>
				<span className={s.title}>Дякуємо. Ваше замовлення було успішно відправлено, ми зв'яжемося з вами найближчим часом!</span>
			</div>
			<button className={s.close}>
				<Icon name="close" className="icon icon-close--popup" />
			</button>
		</div>
	)
}

export default Popup