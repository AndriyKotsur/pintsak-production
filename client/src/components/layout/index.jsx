import React, { Fragment } from 'react'
import { Chat, Header, Footer, } from 'components'

const Layout = ({ children }) => {
	return(
		<Fragment>
			<Header />
			{children}
			<Chat />
			{ window.location.pathname !== '/location' && <Footer />}
		</Fragment>
	)
}

export default Layout