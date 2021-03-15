import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { COOKIES } from 'helpers'
import { Layout } from 'components'
import {
	FrontPage,
	CataloguePage,
	ProductPage,
	OrderPage,
	AboutPage,
	LocationPage,
	ErrorPage,
} from './public'
import {
	Login,
	Dashboard,
	AddTile,
	AddType,
	EditTile,
	EditType,
} from './admin'

const AuthRoute = ({ children, ...otherProps }) => {
	const authToken = COOKIES.getAuthToken()
	if (!authToken)
		return <Redirect to="/" />

	return <Route {...otherProps}>{children}</Route>
}

const Main = () => {
	return (
		<Router>
			<Switch>

				<Route path="/admin" exact>
					<Login />
				</Route>

				<AuthRoute exact path="/admin/dashboard" >
					<Dashboard />
				</AuthRoute>

				<AuthRoute exact path="/admin/edit/type/:id">
					<EditType />
				</AuthRoute>

				<AuthRoute exact path="/admin/edit/tile/:url">
					<EditTile />
				</AuthRoute>

				<AuthRoute exact path="/admin/add/type">
					<AddType />
				</AuthRoute>

				<AuthRoute exact path="/admin/add/tile">
					<AddTile />
				</AuthRoute>

				<Layout>
					<Switch>

						<Route exact path='/'>
							<FrontPage />
						</Route>

						<Route exact path='/catalogue'>
							<CataloguePage />
						</Route>

						<Route exact path='/catalogue/:url'>
							<ProductPage />
						</Route>

						<Route exact path='/order'>
							<OrderPage />
						</Route>

						<Route exact path='/about'>
							<AboutPage />
						</Route>

						<Route exact path='/location'>
							<LocationPage />
						</Route>

						<Route path="/">
							<ErrorPage />
						</Route>

					</Switch>
				</Layout>

			</Switch>
		</Router>
	)
}

export default Main