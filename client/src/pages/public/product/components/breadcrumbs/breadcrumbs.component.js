import React from 'react'
import { Link } from 'react-router-dom'

import s from './style.module.scss'

const Breadcrumbs = ({ type, tile }) => {
	return (
		<ul className={s.wrapper}>
			<li className={s.item}>
				<Link to="/" className={s.link}>Головна</Link>
			</li>
			<li className={s.item}>
				<Link to="/catalogue" className={s.link}>Види продукції</Link>
			</li>
			<li className={s.item}>
				<Link to="/catalogue" className={s.link}>{type}</Link>
			</li>
			<li className={s.item}>{tile}</li>
		</ul>
	)
}

export default Breadcrumbs