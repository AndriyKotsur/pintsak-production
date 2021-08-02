import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Splide, SplideSlide } from '@splidejs/react-splide'

import { Tile } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'
import './slider.scss'

const Carousel = ({ items, styleName }) => {
	const [, setSlideIndex] = useState(0)

	const carouselRef = useRef(null)

	const arrowPath = 'M18.0807 1L36.9645 17.8693L40 20.6808L36.9651 23.4921L17.9156 40L16.5645 34.9319L29.765 23.4924H0V17.8693H30.3478L16.7296 6.06805L18.0807 1Z'

	const carousel = {
		breakpoints: {
			1023: {
				drag: true,
				gap: 80,
				perPage: 2,
			},
			767: {
				width: 290,
				drag: true,
				gap: 20,
				perPage: 1,
			},
		},
		classes: {
			arrows: s.carousel_controls,
			prev: `splide__arrow--prev ${s.carousel_step}`,
			next: `splide__arrow--next ${s.carousel_step}`,
		},
		arrows: true,
		arrowPath: arrowPath,
		drag: false,
		rewind: false,
		perPage: 3,
		pagination: false,
		type: 'loop',
	}

	const handleSlide = ({ index }) => setSlideIndex(index)

	return (
		<div className={classNames(styleName, "popular_carousel")}>
			<div className={s.carousel_header}>
				<h2 className={s.carousel_title}>
					Популярні товари
				</h2>
			</div>
			<Splide ref={carouselRef} options={carousel} onMove={handleSlide}>
				{items && items.length > 0 && items.map((tile, index) => (
					<SplideSlide key={'product_' + index}>
						<Tile tile={tile} settings={{ public: true }} />
					</SplideSlide>
				))}
			</Splide>
		</div>
	)
}

Carousel.propTypes = {
	items: PropTypes.any,
	styleName: PropTypes.string,
}

Carousel.defaultProps = {
	items: [],
	styleName: ''
}
export default Carousel
