import React from 'react'
import { Header, Footer } from 'components'

const Layout = ({ children }) => {
	return(
		<>
			<Header />
			{children}
			{ window.location.pathname !== '/location' && <Footer />}
		</>
	)
}

export default Layout