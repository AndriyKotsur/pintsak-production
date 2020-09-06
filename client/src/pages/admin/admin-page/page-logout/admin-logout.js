import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class AdminLogout extends Component {
  logOut = () => {
    this.props.unSetUser();
    this.props.history.push("/admin");
  }
  render() {
    return(
      <Fragment>
        <button onClick={this.logOut}> Вийти </button>
      </Fragment>
    )
  }
}

export default withRouter(AdminLogout);