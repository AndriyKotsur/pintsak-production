import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import { Icon, Types } from 'components'
import DropdownCart from './components/cart'
import DropdownClipboard from './components/clipboard'
import DropdownLanguage from './components/language'

import classNames from 'classnames'
import s from './style.module.scss'

const Header = () => {
	const [active, setActive] = useState(false)

	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
	}, [dispatch])

	useEffect(() => {
		active && document.body.classList.add(s.hidden)
		!active && document.body.classList.remove(s.hidden)
	}, [active])

	return (
		<header className={s.header}>
			<div className={classNames('container')}>
				<div className={s.header_wrapper}>
					<button
						type='button'
						className={classNames(s.header_hamburger, { [s.active]: active })}
						onClick={() => setActive(prev => !prev)}>
						<span className={s.hamburger_btn} />
					</button>
					<div className={classNames(s.header_menu, { [s.active]: active })}>
						<div className={s.header_background}></div>
						<Types types={types.types} settings={{ public: true, mobile: true }} handleChange={() => setActive(false)} />
					</div>
					<Link to='/' className={s.header_logo}>
						<Icon name='logo' className={classNames('icon', 'icon-logo', s.logo_desktop)} />
						<Icon name='mobile' className={classNames('icon', 'icon-mobile', s.logo_mobile)} />
					</Link>
					<nav className={classNames(s.header_navigation, { [s.active]: active })}>
						<NavLink to='/about' activeClassName={s.active} className={s.navigation_link}>
							Про нас
						</NavLink>
						<NavLink to='/catalogue' activeClassName={s.active} className={s.navigation_link}>
							Види продукції
						</NavLink>
					</nav>
					<div className={s.header_info}>
						<DropdownClipboard />
						<NavLink to='/location' activeClassName={s.active} className={s.info_link}>
							<Icon name='location' className={classNames('icon', 'icon-location')} />
							<span className={s.info_location}>
								Великий Березний вул. Верховинська, 10
							</span>
						</NavLink>
					</div>
					<div className={s.header_action}>
						<DropdownCart />
						<DropdownLanguage />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
