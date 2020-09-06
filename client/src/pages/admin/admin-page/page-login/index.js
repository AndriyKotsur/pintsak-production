import React from 'react';
import AdminLogin from './admin-login';
import { Provider, connect } from 'react-redux';

import store from '../../../../store';
import { setUser } from '../../../../store/action-creators';

let ConnectedLogin = connect(null, { setUser })(AdminLogin);

export default () => (
  <Provider store={store}>
    <ConnectedLogin />
  </Provider>
)