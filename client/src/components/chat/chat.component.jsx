import React from 'react'

const Chat = () => {
	return (
		<div className="request">
			<div className="request-menu">
				<span className="request-menu__background"></span>
				<div className="request-menu-block">
					<h2 className="request-menu__title">Зв'яжіться з нами</h2>
					<form action="#" className="form request-menu-form">
						<div className="input-field request-menu-field">
							<input className="input request-menu__input" required />
							<label htmlFor="#" className="label request-menu__label">Ваше Ім’я</label>
						</div>
						<div className="input-field request-menu-field">
							<input className="input request-menu__input" required />
							<label htmlFor="#" className="label request-menu__label">Ваше номер телефону</label>
						</div>
						<div className="input-field request-menu-field">
							<textarea className="textarea request-menu__textarea"></textarea>
							<label htmlFor="#" className="label request-menu__label--textarea">Ваш комментарій</label>
						</div>
						<p className="required request-menu__required">обов’язкові поля</p>
						<button className="btn-sent btn-orange request-menu__btn" type="submit">Відправити</button>
					</form>
				</div>
			</div>
			<div className="request-button">
				<button className="request-button__item">
					<svg className="icon icon-request">
						<use href="images/icons/sprite.svg#request"></use>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Chat
