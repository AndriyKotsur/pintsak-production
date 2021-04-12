import React, {useLayoutEffect, useRef} from "react"
import {Link} from "react-router-dom"
import {Splide, SplideSlide} from "@splidejs/react-splide"

import {Icon, Types} from "components"

import classNames from "classnames"
import s from "./style.module.scss"

import slideOne from "assets/images/slide-1.png"
import slideTwo from "assets/images/slide-2.png"
import slideThree from "assets/images/slide-3.png"

const Hero = ({ types }) => {
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

    const heroRef = useRef()
    const heroControlsRef = useRef()

    useLayoutEffect(() => {
        heroRef.current.sync(heroControlsRef.current.splide)
    }, [])

    return (
        <div className={s.hero}>
            <div className="container">
                <div className={s.hero_wrapper}>
                    <Types types={types.types} settings={{public: true, light: true}}
                           styleName={s.hero_navigation}/>
                    <div className={s.hero_carousel}>
                        <div className={s.hero_header}>
                            <h1 className={s.hero_title}>Тротуарна плитка</h1>
                            <Link to="/about" className={s.hero_description}>Дізнатися більше
                                <Icon name="description"
                                      className={classNames('icon', 'icon-description', s.hero_icon)}/>
                            </Link>
                        </div>
                        <div className={s.hero_block}>
                            <Splide
                                ref={heroRef}
                                options={hero}>
                                <SplideSlide>
                                    <picture className={s.hero_item}>
                                        <img src={slideOne} alt="Carousel image"/>
                                    </picture>
                                </SplideSlide>
                                <SplideSlide>
                                    <picture className={s.hero_item}>
                                        <img src={slideTwo} alt="Carousel image"/>
                                    </picture>
                                </SplideSlide>
                                <SplideSlide>
                                    <picture className={s.hero_item}>
                                        <img src={slideThree} alt="Carousel image"/>
                                    </picture>
                                </SplideSlide>
                            </Splide>
                        </div>
                        <div className={s.hero_controls}>
                            <Splide options={heroControls} ref={heroControlsRef}>
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
    )
}

export default Hero
