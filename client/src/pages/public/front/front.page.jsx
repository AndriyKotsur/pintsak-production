import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import { Icon } from 'components'
import { Types } from 'components'
import { Splide, SplideSlide } from '@splidejs/react-splide'

import s from './style.module.scss'
import './slider.scss'
import classNames from 'classnames'

import Slide1 from 'assets/images/slide-1.png'
import Slide2 from 'assets/images/slide-2.png'
import Slide3 from 'assets/images/slide-3.png'

const FrontPage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const presentationSlider = {
		perPage: 1,
		perMove: 1,
		arrows: false,
	}
	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return (
		<>
			<div className={s.presentation}>
				<div className="container">
					<div className={s.presentation_wrapper}>
						<Types types={types.types} settings={{ public: true, light: true }} styleName={s.presentation_navigation} />
						<div className={s.presentation_carousel}>
							<div className={s.presentation_header}>
								<h1 className={s.presentation_title}>Тротуарна плитка</h1>
								<Link to="/about" className={s.presentation_description}>Дізнатися більше
									<Icon name="description" className={classNames('icon', 'icon-description', s.presentation_icon)} />
								</Link>
							</div>
							<div className={s.presentation_block}>
								<Splide
									options={presentationSlider}>
									<SplideSlide>
										<picture className={s.presentation_item}>
											<img src={Slide1} alt="Carousel image" />
										</picture>
									</SplideSlide>
									<SplideSlide>
										<picture className={s.presentation_item}>
											<img src={Slide2} alt="Carousel image" />
										</picture>
									</SplideSlide>
									<SplideSlide>
										<picture className={s.presentation_item}>
											<img src={Slide3} alt="Carousel image" />
										</picture>
									</SplideSlide>
								</Splide>
							</div>
							<div className={s.presentation_controls}>
								<a href="#" className={s.presentation_dot}>01</a>
								<a href="#" className={s.presentation_dot}>02</a>
								<a href="#" className={s.presentation_dot}>03</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={s.popular}>
				<div className="container">
					<div className={s.popular_wrapper}>
						<Types types={types.types} settings={{ public: true }} />
						<div className={s.popular_slider}>
							<div className={s.popular_header}>
								<h2 className={s.popular_title}>Популярні товари</h2>
								<div className={s.popular_controls}>
									<span className={s.popular_step}>
										<svg className="icon icon-arrow--carousel carousel__arrow--left">
											<use href="images/icons/sprite.svg#arrow"></use>
										</svg>
									</span>
									<span className={s.popular_step}>
										<svg className="icon icon-arrow--carousel carousel__arrow--right">
											<use href="images/icons/sprite.svg#arrow"></use>
										</svg>
									</span>
								</div>
							</div>
							<div className={s.popular_block}></div>
						</div>
					</div>
				</div>
			</div>

			<div className={s.cons}>
				<div className="container">
					<div className={s.cons_wrapper}>
						<div className={s.cons_item}>
							<h3 className={s.cons_title}>Доставка по регіону</h3>
							<div className={s.cons_image}>
								<Icon name="delivery" className="icon icon-delivery" />
							</div>
						</div>
						<div className={s.cons_item}>
							<h3 className={s.cons_title}>Індивідуальний підхід</h3>
							<div className={s.cons_image}>
								<Icon name="approach" className="icon icon-approach" />
							</div>
						</div>
						<div className={s.cons_item}>
							<h3 className={s.cons_title}>Лояльні ціни</h3>
							<div className={s.cons_image}>
								<Icon name="price" className="icon icon-price" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="contact-us">
				<div className="container">
					<div className="contact-us-inner">
						<h2 className="contact-us__title">
                    Звяжіться з нами
						</h2>
						<form action="#" className="form contact-us-form">
							<div className="input-field contact-us-field">
								<input className="input contact-us__input" required />
								<label htmlFor="#" className="label contact-us__label">Ваше Ім’я</label>
							</div>
							<div className="input-field contact-us-field">
								<input className="input contact-us__input" required />
								<label htmlFor="#" className="label contact-us__label">Ваше номер телефону</label>
							</div>
							<div className="input-field contact-us-field">
								<textarea className="textarea contact-us__textarea"></textarea>
								<label htmlFor="#" className="label contact-us__label--textarea">Ваш комментарій</label>
							</div>
							<p className="required contact-us__required">обов’язкові поля</p>
							<button className="btn-sent btn-orange contact-us__btn" type="submit">Відправити</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default FrontPage