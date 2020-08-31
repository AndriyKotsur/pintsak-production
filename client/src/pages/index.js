import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import authRequired from '../middleware/authRequired';

import AdminLogin from './admin/admin-page/page-login';

import AdminMain from './admin/admin-main';
import MainTile from './admin/admin-main/main-tile';
import MainType from './admin/admin-main/main-type';

import { Catalogue } from './public';
import { EditType, EditTile, AddType, AddTile } from './admin';

import ErrorPage from './errors';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <Fragment>
        <Switch>

          {/* admin routes */}

          <Route path="/admin" exact component={AdminLogin} />

          <Route path="/admin/main" exact component={authRequired(AdminMain)} />
          <Route path="/admin/main/tile" exact component={authRequired(MainTile)} />
          <Route path="/admin/main/type" exact component={authRequired(MainType)} />

          <Route path="/admin/edit/type/:id">
            <EditType />
          </Route>

          <Route path="/admin/edit/tile/:id">
            <EditTile />
          </Route>

          <Route path="/admin/add/type">
            <AddType />
          </Route>

          <Route path="/admin/add/tile">
            <AddTile />
          </Route>

          {/* public routes */}

          <Route path='/catalogue/:type'>
            <Catalogue/>
          </Route>

          <Route path="/" component={ErrorPage} />
        </Switch>
      </Fragment>
    );
  }
}

export default Main;