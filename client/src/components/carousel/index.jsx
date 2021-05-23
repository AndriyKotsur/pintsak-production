import React, { useState, useRef } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"

import { Tile } from "components"

import classNames from 'classnames'
import s from "./style.module.scss"

const Carousel = ({ items, styleName }) => {
	const [slideIndex, setSlideIndex] = useState(0)
	const arrowPath = 'M18.0807 1L36.9645 17.8693L40 20.6808L36.9651 23.4921L17.9156 40L16.5645 34.9319L29.765 23.4924H0V17.8693H30.3478L16.7296 6.06805L18.0807 1Z'
	const carouselRef = useRef(null)

	const carousel = {
		type: 'slide',
		rewind: false,
		perPage: 3,
		breakpoints: {
			1023: {
				perPage: 2,
				drag: true,
			},
			767: {
				width: 290,
				perPage: 1,
				gap: 20,
				drag: true
			},
		},
		pagination: false,
		arrows: true,
		arrowPath: arrowPath,
		classes: {
			arrows: s.carousel_controls,
			prev: `splide__arrow--prev ${s.carousel_step}`,
			next: `splide__arrow--next ${s.carousel_step}`,
		},
		drag: false,
	}

	const handleSlide = ({ index }) => setSlideIndex(index)
	
	return (
		<div className={classNames(styleName, { [s.carousel_prev]: slideIndex <= 0 })}>
			<div className={s.carousel_header}>
				<h2 className={s.carousel_title}>Популярні товари</h2>
			</div>
			<Splide options={carousel} ref={carouselRef} onMove={handleSlide}>
				{items && items.length > 0 && items.map((tile, index) => (
					<SplideSlide key={'tile_' + index}>
						<Tile tile={tile} settings={{ public: true }} />
					</SplideSlide>
				))}
			</Splide>
		</div>
	)
}

export default Carousel
