import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { Cart, Chat, Header, Footer } from 'components'

const Layout = ({ children }) => {
	const cart = useSelector(state => state.cart)

	return (
		<Fragment>
			<Header />
				{children}
			<Chat />
			{cart.is_active && <Cart />}
			{ window.location.pathname !== '/location' && <Footer />}
		</Fragment>
	)
}

export default Layout