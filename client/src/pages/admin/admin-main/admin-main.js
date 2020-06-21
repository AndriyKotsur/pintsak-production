import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import AdminLogout from '../admin-page/page-logout';
const AdminMain =()=> {
        return(
                <Fragment>
                   <header>
                       <nav>
                           <Link to="/admin/main/tile">Список товарів</Link>
                           <Link to="/admin/main/type">Список категорій</Link>
                       </nav>
                   </header>
                   <AdminLogout/>
                </Fragment>
        )
}
 
export default AdminMain;