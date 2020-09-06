import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { COOKIES } from '../helpers'
import { Catalogue, ErrorPage } from './public'
import {
  AdminLogin,
  AdminMain,
  MainTile,
  MainType,
  AddTile,
  AddType,
  EditTile,
  EditType,
} from './admin'

const AuthRoute = ({ children, route, ...otherProps }) => {
  const authToken = COOKIES.getAuthToken()
  if (!authToken) {
    return <Redirect to="/" />
  }
  return <Route {...otherProps}>{children}</Route>
}

const Main = () => {
  return (
    <Fragment>
      <Switch>
        {/* admin routes */}

        <Route path="/admin" exact component={AdminLogin} />

        <AuthRoute exact path="/admin/main" >
          <AdminMain />
        </AuthRoute>

        <AuthRoute exact path="/admin/main/type" >
          <MainType />
        </AuthRoute>

        <AuthRoute exact path="/admin/main/tile" >
          <MainTile />
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

        {/* public routes */}

        <Route path='/catalogue/:type'>
          <Catalogue/>
        </Route>

        <Route path="/">
          <ErrorPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Main;