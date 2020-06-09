import React, { Component, Fragment } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import AdminPage from './admin/admin-page';

import AdminMain from './admin/admin-main';
import MainTile from './admin/admin-main/main-tile';
import MainType from './admin/admin-main/main-type';
import AddTile from './admin/admin-add/add-tile';
import AddType from './admin/admin-add/add-type';
import EditTile from './admin/admin-edit/edit-tile';
import EditType from './admin/admin-edit/edit-type';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Fragment>
                <Switch>
                    <Route path="/admin" exact component={AdminPage} />

                    <Route path="/admin/main" exact component={AdminMain} />
                    <Route path="/admin/main/tile" exact component={MainTile} />
                    <Route path="/admin/main/type" exact component={MainType} />
                    <Route path="/admin/add/tile" exact component={AddTile} />
                    <Route path="/admin/add/type" exact component={AddType}/>

                    <Route path="/admin/edit/tile/:id" exact component={EditTile} />
                    <Route path="/admin/edit/type/:id" exact component={EditType} />
                    
                </Switch>
            </Fragment>
         );
    }
}
 
export default Main;