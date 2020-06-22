import React from 'react';
import AdminLogout from './admin-logout';
import { Provider, connect } from 'react-redux';

import store from '../../../../store';
import { unSetUser } from '../../../../store/action-creators';

let ConnectedLogin = connect(null, { unSetUser })(AdminLogout);

export default () => (
    <Provider store={store}>
        <ConnectedLogin />
    </Provider>
)