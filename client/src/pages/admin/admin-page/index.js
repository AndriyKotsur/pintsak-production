import React from 'react';
import AdminPage from './admin-page';
import {Provider, connect} from 'react-redux';

import store from '../../../store';
import {setUser} from '../../../store/action-creators';

let ConnectedLogin = connect(null, {setUser})(AdminPage);

export default () => (
    <Provider store={store}>
        <ConnectedLogin />
    </Provider>
)