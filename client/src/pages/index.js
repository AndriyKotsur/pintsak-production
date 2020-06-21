import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import authRequired from '../middleware/authRequired';
import AdminLogin from './admin/admin-page/page-login';

import AdminMain from './admin/admin-main';
import MainTile from './admin/admin-main/main-tile';
import MainType from './admin/admin-main/main-type';
import AddTile from './admin/admin-add/add-tile';
import AddType from './admin/admin-add/add-type';
import EditTile from './admin/admin-edit/edit-tile';
import EditType from './admin/admin-edit/edit-type';

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
                    <Route path="/admin" exact component={AdminLogin} />

                    <Route path="/admin/main" exact component={authRequired(AdminMain)} />
                    <Route path="/admin/main/tile" exact component={authRequired(MainTile)} />
                    <Route path="/admin/main/type" exact component={authRequired(MainType)} />
                    <Route path="/admin/add/tile" exact component={authRequired(AddTile)} />
                    <Route path="/admin/add/type" exact component={authRequired(AddType)} />

                    <Route path="/admin/edit/tile/:id" exact component={authRequired(EditTile)} />
                    <Route path="/admin/edit/type/:id" exact component={authRequired(EditType)} />
                    
                    <Route path="/" component={ErrorPage} />
                </Switch>
            </Fragment>
         );
    }
}
 
export default Main;