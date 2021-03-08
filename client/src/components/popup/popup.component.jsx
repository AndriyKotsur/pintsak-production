import React from 'react'
import s from './style.module.scss'

const Popup = () => {
	return (
		<div className="popup">
			<div className="popup-message">
				<span className="popup-message__title">
            Дякуємо. Ваше замовлення було успішно відправлено, ми зв'яжемося з вами найближчим часом!
				</span>
			</div>
			<button className="popup__close">
				<svg className="icon icon-close--popup">
					<use href="images/icons/sprite.svg#popup-close"></use>
				</svg>
			</button>
		</div>
	)
}

export default Popup