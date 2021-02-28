import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import { Types } from 'components'
import Clipboard from './components/clipboard/clipboard.component'
import Cart from './components/cart/cart.component'
import s from './style.module.scss'
import classNames from 'classnames'

const Header = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return(
		<header className={s.header}>
			<div className={classNames('container')}>
				<div className={s.wrapper}>
					<button className={s.hamburger}>
						<span className={s.hamburger_btn}></span>
					</button>
					<div className={s.menu}>
						<div className={s.background}></div>
						<Types types={types.types} settings={{ public: true }} />
					</div>
					<Link to="/" className={s.logo}>
						<Icon name="logo" className={classNames('icon', 'icon-logo', s.logo_desktop)} />
						<Icon name="mobile" className={classNames('icon', 'icon-mobile', s.logo_mobile)} />
					</Link>
					<nav className={s.navigation}>
						<Link to="/about" className={s.navigation_link}>Про нас</Link>
						<Link to="/catalogue" className={s.navigation_link}>Види продукції</Link>
					</nav>
					<div className={s.info}>
						<Link to="/location" className={s.info_link}>
							<Icon name="phone" className={classNames('icon', 'icon-phone')} />
							<span className={s.info_phone}>+380636666666</span>
							<Clipboard />
						</Link>
						<Link to="/location" className={s.info_link}>
							<Link name="location" className={classNames('icon', 'icon-location--header')} />
							<span className={s.info_location}>Великий Березний вул. Верховинська, 10</span>
						</Link>
					</div>
					<div className={s.action}>
						<div className={s.action_cart}>
							<Icon name="shopping" className={classNames('icon', 'icon-cart', s.action_icon)} />
							<span className={s.action_text}>(0)</span>
							<Cart />
						</div>
						<div className={s.action_lang}>
							<Icon name="language" className={classNames('icon', 'icon-lang', s.action_icon)} />
							<span className={s.action_text}>Uk</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header