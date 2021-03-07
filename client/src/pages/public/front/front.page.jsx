import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import { Icon, Form, Input, Background } from 'components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Types } from 'components'

import s from './style.module.scss'
import './slider.scss'
import classNames from 'classnames'

import Slide1 from 'assets/images/slide-1.png'
import Slide2 from 'assets/images/slide-2.png'
import Slide3 from 'assets/images/slide-3.png'

const hero = {
	type: 'loop',
	perPage: 1,
	perMove: 1,
	width: 450,
	arrows: false,
	pagination: false,
	autoplay: true,
	breakpoints: {
		1024: {
			width: 325,
		},
		767: {
			width: 260,
		},
	},
}

const heroControls = {
	type: 'slide',
	rewind: true,
	perPage: 3,
	perMove: 1,
	arrows: false,
	pagination: false,
	isNavigation: true,
	updateOnMove: true,
}

const FrontPage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const heroRef = useRef()
	const heroControlsRef = useRef()

	useLayoutEffect(() => {
		heroRef.current.sync(heroControlsRef.current.splide)
	}, [])

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return (
		<>
			<div className={s.hero}>
				<div className="container">
					<div className={s.hero_wrapper}>
						<Types types={types.types} settings={{ public: true, light: true }} styleName={s.hero_navigation} />
						<div className={s.hero_carousel}>
							<div className={s.hero_header}>
								<h1 className={s.hero_title}>Тротуарна плитка</h1>
								<Link to="/about" className={s.hero_description}>Дізнатися більше
									<Icon name="description" className={classNames('icon', 'icon-description', s.hero_icon)} />
								</Link>
							</div>
							<div className={s.hero_block}>
								<Splide
									ref={heroRef}
									options={hero}>
									<SplideSlide>
										<picture className={s.hero_item}>
											<img src={Slide1} alt="Carousel image" />
										</picture>
									</SplideSlide>
									<SplideSlide>
										<picture className={s.hero_item}>
											<img src={Slide2} alt="Carousel image" />
										</picture>
									</SplideSlide>
									<SplideSlide>
										<picture className={s.hero_item}>
											<img src={Slide3} alt="Carousel image" />
										</picture>
									</SplideSlide>
								</Splide>
							</div>
							<div className={s.hero_controls}>
								<Splide options={heroControls} ref={heroControlsRef} onClick={( splide, prev, next ) => { console.log( prev, next )}}>
									<SplideSlide>
										<span className={s.hero_dot}>01</span>
									</SplideSlide>
									<SplideSlide>
										<span className={s.hero_dot}>02</span>
									</SplideSlide>
									<SplideSlide>
										<span className={s.hero_dot}>03</span>
									</SplideSlide>
								</Splide>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={s.popular}>
				<div className="container">
					<div className={s.popular_wrapper}>
						<Types types={types.types} settings={{ public: true }} styleName={s.popular_navigation} />
						<div className={s.popular_carousel}>
							<div className={s.popular_header}>
								<h2 className={s.popular_title}>Популярні товари</h2>
								<div className={s.popular_controls}>
									<span className={s.popular_step}>
										<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.popular_arrow_left)} />
									</span>
									<span className={s.popular_step}>
										<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.popular_arrow_right)} />
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
			<div className={s.contact}>
				<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
				<div className="container">
					<div className={s.contact_wrapper}>
						<Form
							title="Звяжіться з нами"
							required>
							<Input
								type='text'
								name='title'
								title='Ваше Ім’я'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Input
								type='text'
								name='title'
								title='Ваше номер телефону'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Input
								type='text'
								name='title'
								title='Ваш комментарій'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
						</Form>
					</div>
				</div>
			</div>
		</>
	)
}

export default FrontPage