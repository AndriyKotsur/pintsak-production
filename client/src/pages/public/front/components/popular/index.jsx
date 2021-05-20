import React from "react"

import {Types, Carousel} from "components"

import s from "./style.module.scss"

const Popular = ({ types, tiles }) => {
    return (
        <div className={s.popular}>
            <div className="container">
                <div className={s.popular_wrapper}>
                    <Types
                        types={types.types}
                        settings={{public: true}}
                        styleName={s.popular_navigation}/>
                    <Carousel items={tiles.popular_tiles} styleName={s.carousel}/>
                </div>
            </div>
        </div>
    )
}

export default Popular
