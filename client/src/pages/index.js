import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { COOKIES } from '../helpers'
import {
	Catalogue,
	ErrorPage,
} from './public'
import {
	AdminLogin,
	AdminDashboard,
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
					<AdminLogin />
				</Route>

				<AuthRoute exact path="/admin/dashboard" >
					<AdminDashboard />
				</AuthRoute>

				<AuthRoute exact path="/admin/edit/type/:id">
					<EditType />
				</AuthRoute>

				<AuthRoute exact path="/admin/edit/tile/:id">
					<EditTile />
				</AuthRoute>

				<AuthRoute exact path="/admin/add/type">
					<AddType />
				</AuthRoute>

				<AuthRoute exact path="/admin/add/tile">
					<AddTile />
				</AuthRoute>

				<Route path='/catalogue/:type'>
					<Catalogue/>
				</Route>

				<Route path="/">
					<ErrorPage />
				</Route>

			</Switch>
		</Router>
	)
}

export default Main