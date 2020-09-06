import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminLogin from './admin/admin-page/page-login';
import { Catalogue } from './public';
import { EditType, EditTile, AddType, AddTile, AdminMain, MainTile, MainType } from './admin';

import { ErrorPage } from './errors';

const Main = () => {
  return (
    <Fragment>
      <Switch>

        {/* admin routes */}

        <Route path="/admin" exact component={AdminLogin} />

        <Route exact path="/admin/main" >
          <AdminMain />
        </Route>

        <Route exact path="/admin/main/type" >
          <MainType />
        </Route>

        <Route exact path="/admin/main/tile" >
          <MainTile />
        </Route>

        <Route exact path="/admin/edit/type/:id">
          <EditType />
        </Route>

        <Route exact path="/admin/edit/tile/:id">
          <EditTile />
        </Route>

        <Route exact path="/admin/add/type">
          <AddType />
        </Route>

        <Route exact path="/admin/add/tile">
          <AddTile />
        </Route>

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