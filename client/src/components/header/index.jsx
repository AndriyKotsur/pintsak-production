import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import { Icon, Types } from 'components'
import DropdownCart from './components/cart'
import DropdownClipboard from './components/clipboard'
import DropdownLanguage from './components/language'

import classNames from 'classnames'
import s from './style.module.scss'

const Header = () => {
	const [isMobile, setIsMobile] = useState(false)

	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())

		return () => dispatch(GetTypesActions.clear())
	}, [dispatch])

	useEffect(() => {
		isMobile && document.body.classList.add(s.hidden)
		!isMobile && document.body.classList.remove(s.hidden)
	}, [isMobile])

	return (
		<header className={s.header}>
			<div className={classNames('container')}>
				<div className={s.wrapper}>
					<button
						type="button"
						className={classNames(s.hamburger, { [s.mobile]: isMobile })}
						onClick={() => setIsMobile(prev => !prev)}>
						<span className={s.hamburger_btn}></span>
					</button>
					<div className={classNames(s.menu, { [s.mobile]: isMobile })}>
						<div className={s.background}></div>
						<Types types={types.types} settings={{ public: true, mobile: true }} />
					</div>
					<Link to="/" className={s.logo}>
						<Icon name="logo" className={classNames('icon', 'icon-logo', s.logo_desktop)} />
						<Icon name="mobile" className={classNames('icon', 'icon-mobile', s.logo_mobile)} />
					</Link>
					<nav className={classNames(s.navigation, { [s.navigation]: isMobile })}>
						<Link to="/about" className={s.navigation_link}>Про нас</Link>
						<Link to="/catalogue" className={s.navigation_link}>Види продукції</Link>
					</nav>
					<div className={s.info}>
						<DropdownClipboard />
						<Link to="/location" className={s.info_link}>
							<Icon name="location" className={classNames('icon', 'icon-location')} />
							<span className={s.info_location}>Великий Березний вул. Верховинська, 10</span>
						</Link>
					</div>
					<div className={s.action}>
						<DropdownCart />
						<DropdownLanguage />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
