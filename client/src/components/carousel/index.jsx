import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Icon } from 'components'
import { Tiles } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const carousel = {
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

const carouselControls = {
	type: 'slide',
	rewind: true,
	perPage: 3,
	perMove: 1,
	arrows: false,
	pagination: false,
	isNavigation: true,
	updateOnMove: true,
}

const Carousel = ({ settings }) => {

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<h2 className={s.title}>Популярні товари</h2>
				<div className={s.controls}>
					<span className={s.step}>
						<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.arrow_left)} />
					</span>
					<span className={s.step}>
						<Icon name="carousel" className={classNames('icon', 'icon-carousel', s.arrow_right)} />
					</span>
				</div>
			</div>
			<div className={s.block}>
				{}
			</div>
		</div>
	)
}

export default Carousel
