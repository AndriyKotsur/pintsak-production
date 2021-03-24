import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Front, Catalogue, Product, Order, About, Location, Error } from 'pages/public'
import { Login, Dashboard, AddTile, AddType, EditTile, EditType } from 'pages/admin'
import { Layout } from 'components'
import { COOKIES } from 'helpers'
import { store } from './store'
import './App.scss'

const AuthRoute = ({ children, ...otherProps }) => {
	const authToken = COOKIES.getAuthToken()
	if (!authToken)
		return <Redirect to="/" />

	return <Route {...otherProps}>{children}</Route>
}

const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Switch>

						<Route exact path="/admin">
							<Login />
						</Route>

						<AuthRoute exact path="/admin/dashboard">
							<Dashboard />
						</AuthRoute>

						<AuthRoute exact path="/admin/type/:id">
							<EditType />
						</AuthRoute>

						<AuthRoute exact path="/admin/tile/:url">
							<EditTile />
						</AuthRoute>

						<AuthRoute exact path="/admin/type">
							<AddType />
						</AuthRoute>

						<AuthRoute exact path="/admin/tile">
							<AddTile />
						</AuthRoute>

						<Layout>
							<Switch>

								<Route exact path='/'>
									<Front />
								</Route>

								<Route exact path='/catalogue'>
									<Catalogue />
								</Route>

								<Route exact path='/catalogue/:url'>
									<Product />
								</Route>

								<Route exact path='/order'>
									<Order />
								</Route>

								<Route exact path='/about'>
									<About />
								</Route>

								<Route exact path='/location'>
									<Location />
								</Route>

								<Route path="/">
									<Error />
								</Route>

							</Switch>
						</Layout>

					</Switch>
				</Router>
			</Provider>
		</div>
	)
}

export default App
