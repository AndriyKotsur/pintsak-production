import React from 'react'

const Cart = () => {
	return (
		<div className="cart">
			<div className="cart-block">
				<div className="cart-header">
					<h2 className="cart-header__title">
                Товари в кошику
					</h2>
					<button className="cart-header__close" type="button">
						<svg className="icon icon-close--big">
							<use href="images/icons/sprite.svg#close"></use>
						</svg>
					</button>
				</div>
				<div className="cart-description">
					<span className="cart-description__item">Кількість, м<sup>2</sup></span>
					<span className="cart-description__item">Ціна, грн</span>
					<span className="cart-description__item">Сума, грн</span>
				</div>
				<div className="cart-content">
					<div className="cart-item">
						<div className="cart-item__product">
							<button className="cart-item__close" type="button">
								<svg className="icon icon-close-small">
									<use href="images/icons/sprite.svg#close"></use>
								</svg>
							</button>
							<a href="#" className="cart-item__image">
								<img src="images/product-tile-rome.png" alt="Product image" />
							</a>
							<div className="cart-item__link">
								<a href="#" className="cart-item__type">Дорожні блоки та плити</a>
								<a href="#" className="cart-item__title">Бордюр парковий поворотний</a>
							</div>
						</div>
						<div className="cart-item__total">
							<div className="calc cart-calc">
								<button className="calc__remove cart-calc__remove">
									<svg className="icon icon-minus">
										<use href="images/icons/sprite.svg#minus"></use>
									</svg>
								</button>
								<input type="number" className="calc__count cart-calc__count" min="1" value="1" />
								<button className="calc__add cart-calc__add">
									<svg className="icon icon-plus">
										<use href="images/icons/sprite.svg#plus"></use>
									</svg>
								</button>
							</div>
							<div className="cart-item__coast">
								<span className="cart-item__price">120,<sup>00</sup></span>
								<span className="cart-item__sum">1200,<sup>00</sup></span>
							</div>
						</div>
					</div>
					<div className="cart-item">
						<div className="cart-item__product">
							<button className="cart-item__close" type="button">
								<svg className="icon icon-close-small">
									<use href="images/icons/sprite.svg#close"></use>
								</svg>
							</button>
							<a href="#" className="cart-item__image">
								<img src="images/product-tile-rome.png" alt="Product image" />
							</a>
							<div className="cart-item__link">
								<a href="#" className="cart-item__type">Дорожні блоки та плити</a>
								<a href="#" className="cart-item__title">Бордюр парковий поворотний</a>
							</div>
						</div>
						<div className="cart-item__total">
							<div className="calc cart-calc">
								<button className="calc__remove cart-calc__remove">
									<svg className="icon icon-minus">
										<use href="images/icons/sprite.svg#minus"></use>
									</svg>
								</button>
								<input type="number" className="calc__count cart-calc__count" min="1" value="1" />
								<button className="calc__add cart-calc__add">
									<svg className="icon icon-plus">
										<use href="images/icons/sprite.svg#plus"></use>
									</svg>
								</button>
							</div>
							<div className="cart-item__coast">
								<span className="cart-item__price">35,<sup>00</sup></span>
								<span className="cart-item__sum">350,<sup>00</sup></span>
							</div>
						</div>
					</div>
					<div className="cart-item">
						<div className="cart-item__product">
							<button className="cart-item__close" type="button">
								<svg className="icon icon-close-small">
									<use href="images/icons/sprite.svg#close"></use>
								</svg>
							</button>
							<a href="#" className="cart-item__image">
								<img src="images/product-tile-rome.png" alt="Product image" />
							</a>
							<div className="cart-item__link">
								<a href="#" className="cart-item__type">Дорожні блоки та плити</a>
								<a href="#" className="cart-item__title">Бордюр парковий поворотний</a>
							</div>
						</div>
						<div className="cart-item__total">
							<div className="calc cart-calc">
								<button className="calc__remove cart-calc__remove">
									<svg className="icon icon-minus">
										<use href="images/icons/sprite.svg#minus"></use>
									</svg>
								</button>
								<input type="number" className="calc__count cart-calc__count" min="1" value="1" />
								<button className="calc__add cart-calc__add">
									<svg className="icon icon-plus">
										<use href="images/icons/sprite.svg#plus"></use>
									</svg>
								</button>
							</div>
							<div className="cart-item__coast">
								<span className="cart-item__price">1200,<sup>00</sup></span>
								<span className="cart-item__sum">12000,<sup>00</sup></span>
							</div>
						</div>
					</div>
				</div>
				<div className="cart-order">
					<div className="cart-back">
						<span className="cart-back__title">Продовжити покупки</span>
						<button className="cart-back__btn">
							<svg className="icon icon-arrow">
								<use href="images/icons/sprite.svg#arrow"></use>
							</svg>
						</button>
					</div>
					<div className="cart-trade">
						<div className="cart-trade__coast">
							<span className="cart-trade__total">Підсумок</span>
							<span className="cart-trade__sum">199980,<sup>00 грн</sup></span>
						</div>
						<button className="cart-trade__btn">Замовити</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart