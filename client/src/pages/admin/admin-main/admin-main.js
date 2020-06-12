import React, { Fragment } from 'react';

const AdminMain = () => {
    return(
            <Fragment>
               <header>
                   <nav>
                       <a href="/admin/main/tile">Список товарів</a>
                       <a href="/admin/main/type">Список категорій</a>
                   </nav>
               </header>
            </Fragment>
    )
}
 
export default AdminMain;