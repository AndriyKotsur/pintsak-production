import React, { Fragment, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide'

import { Icon, Types } from 'components'

import './slider.scss'
import classNames from 'classnames'
import s from './style.module.scss'

import slideOne from 'assets/images/slide-1.png'
import slideTwo from 'assets/images/slide-2.png'
import slideThree from 'assets/images/slide-3.png'

const Hero = ({ types }) => {
	const [slideIndex, setSlideIndex] = useState(0)

	const heroSliderRef = useRef()
	const heroSliderControlsRef = useRef()
	
	const heroTitles = {
		0: 'Тротуарна плитка',
		1: 'Шапки',
		2: 'Бордюри'
	}

	const heroSlider = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		width: 450,
		arrows: false,
		pagination: false,
		autoplay: true,
		drag: false,
		pauseOnFocus: false,
		breakpoints: {
			1024: {
				width: 325,
			},
			767: {
				width: 260,
			},
		},
	}

	const heroSliderControls = {
		type: 'slide',
		rewind: true,
		perPage: 3,
		perMove: 1,
		arrows: false,
		pagination: false,
		isNavigation: true,
		updateOnMove: true,
	}

	const handleSlide = ({ index }) => setSlideIndex(index)

	useLayoutEffect(() => {
		heroSliderRef.current.sync(heroSliderControlsRef.current.splide)
	}, [])

	return (
		<section className={s.hero}>
			<div className='container'>
				<div className={s.hero_wrapper}>
					<Types types={types.types} settings={{ public: true, light: true }} styleName={s.hero_navigation} />
					<div className={s.hero_carousel}>
						<div className={s.hero_header}>
							<h1 className={s.hero_title}>
								{heroTitles[slideIndex]}
							</h1>
							<Link to='/about' className={s.hero_description}>
								Дізнатися більше
							<Icon name='description'
									className={classNames('icon', 'icon-description', s.hero_icon)} />
							</Link>
						</div>
						<div className={s.hero_block}>
							<Splide
								ref={heroSliderRef}
								options={heroSlider}
								onMove={handleSlide}>
								<SplideSlide>
									<picture className={s.hero_item}>
										<img src={slideOne} alt='Product card' />
									</picture>
								</SplideSlide>
								<SplideSlide>
									<picture className={s.hero_item}>
										<img src={slideTwo} alt='Product card' />
									</picture>
								</SplideSlide>
								<SplideSlide>
									<picture className={s.hero_item}>
										<img src={slideThree} alt='Product card' />
									</picture>
								</SplideSlide>
							</Splide>
						</div>
						<div className={classNames(s.hero_controls, "hero_carousel")}>
							<Splide options={heroSliderControls} ref={heroSliderControlsRef}>
								<SplideSlide>
									<span className={s.hero_dot}>
										01
									</span>
								</SplideSlide>
								<SplideSlide>
									<span className={s.hero_dot}>
										02
									</span>
								</SplideSlide>
								<SplideSlide>
									<span className={s.hero_dot}>
										03
									</span>
								</SplideSlide>
							</Splide>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

Hero.propTypes = {
	types: PropTypes.any,
}

Hero.defaultProps = {
	types: [],
}
export default Hero
