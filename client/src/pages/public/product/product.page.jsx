import React from 'react'

const ProductPage = () => {
	return (
		<div className="product">
			<div className="container">
				<div className="product-inner">
					<a href="#" className="product-back">
						<svg className="icon icon-arrow--cart product-back__icon">
							<use href="images/icons/sprite.svg#arrow-cart"></use>
						</svg>
                Тротуарна
					</a>
					<ul className="product-breadcrumbs">
						<li className="product-breadcrumbs__item"><a href="#" className="product-breadcrumbs__link">Головна</a></li>
						<li className="product-breadcrumbs__item"><a href="#" className="product-breadcrumbs__link">Види
                        продукції</a></li>
						<li className="product-breadcrumbs__item"><a href="#" className="product-breadcrumbs__link">Тротуарна
                        плитка</a></li>
						<li className="product-breadcrumbs__item">Тротуарна</li>
					</ul>

					<div className="product-block">
						<span className="product__status">В наявності</span>
						<div className="product-gallery">
							<div className="product-gallery__small">
								<img src="images/product-tile-curpet.png" alt="Gallery image"
									className="gallery-small__img" />
								<img src="images//product-tile-curpet1.png" alt="Gallery image"
									className="product-gallery__img" />
								<img src="images/product-tile-curpet2.png" alt="Gallery image" className="product-gallery__img" />
							</div>
							<div className="product-gallery__large">
								<img src="images/product-tile-border.png" alt="Gallery image" className="product-gallery__img" />
							</div>
						</div>
						<div className="product-trade">
							<div className="product-trade-wrapper">
								<h1 className="product-trade__title">Коврова</h1>
								<p className="product-trade__price">190,<sup> 00 грн</sup></p>

								<div className="calc product-calc">
									<button className="calc__remove product-calc__remove">
										<svg className="icon icon-minus">
											<use href="images/icons/sprite.svg#minus"></use>
										</svg>
									</button>
									<input type="number" className="calc__count product-calc__count" min="1" value="1" />
									<button className="calc__add product-calc__add">
										<svg className="icon icon-plus">
											<use href="images/icons/sprite.svg#plus"></use>
										</svg>
									</button>
									<span className="product-trade__size">м<sup>2</sup></span>
								</div>
								<a href="./order.html" className="btn-green btn-cart product-trade__btn">
									<svg className="icon icon-cart">
										<use href="images/icons/sprite.svg#cart"></use>
									</svg>
                            В кошик
								</a>
							</div>
						</div>
					</div>

					<div className="product-table">
						<h2 className="product-table__header">Опис товару</h2>
						<table className="product-table__block">
							<thead className="product-table__title">
								<tr>
									<th>Товщина (см)</th>
									<th>Розмір (см)</th>
									<th>Шт на 1 м2</th>
									<th>Вага на 1 м2</th>
									<th>Ціна в базовому окрасі <span>(сірий, червоний)</span></th>
								</tr>
							</thead>
							<tbody className="product-table__body">
								<tr>
									<td>2,5</td>
									<td>30х30 / 22х22</td>
									<td>11/11</td>
									<td>55</td>
									<td>130</td>
								</tr>
								<tr>
									<td>4,5</td>
									<td>30х30 / 22х22</td>
									<td>11/11</td>
									<td>100</td>
									<td>210</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductPage