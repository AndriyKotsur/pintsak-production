import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import s from './style.module.scss'

const Breadcrumbs = ({ type, tile }) => {
	return (
		<ul className={s.breadcrumbs}>
			<li className={s.breadcrumbs_item}>
				<Link to='/' className={s.breadcrumbs_link}>
					Головна
				</Link>
			</li>
			<li className={s.breadcrumbs_item}>
				<Link to='/catalogue' className={s.breadcrumbs_link}>
					Види продукції
				</Link>
			</li>
			<li className={s.breadcrumbs_item}>
				<Link to={`/catalogue/${type.url}`} className={s.breadcrumbs_link}>
					{type.title}
				</Link>
			</li>
			<li className={s.breadcrumbs_item}>
				{tile}
			</li>
		</ul>
	)
}

Breadcrumbs.propTypes = {
	type: PropTypes.object,
  tile: PropTypes.string,
}

Breadcrumbs.defaultProps = {
	type: {},
  tile: '',
}
export default Breadcrumbs
