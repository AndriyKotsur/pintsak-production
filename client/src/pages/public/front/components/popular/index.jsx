import React from 'react'
import PropTypes from 'prop-types'

import { Types, Carousel } from 'components'

import s from './style.module.scss'

const Popular = ({ types, tiles }) => {
	return (
		<div className={s.popular}>
			<div className='container'>
				<div className={s.popular_wrapper}>
					<Types
						types={types.types}
						settings={{public: true}}
						styleName={s.popular_navigation}/>
					<Carousel
						items={tiles.popular_tiles}
						styleName={s.popular_carousel}/>
				</div>
			</div>
		</div>
	)
}

Popular.propTypes = {
	types: PropTypes.any,
	tiles: PropTypes.any,
}

Popular.defaultProps = {
	types: [],
	tiles: []
}
export default Popular
