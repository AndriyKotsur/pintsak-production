import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

export default function authRequired(ProtectedComponent){
    class Authorized extends Component {
        componentDidMount(){
            if(!localStorage.token)
                this.props.history.push('/admin')
        }
        getSnapshotBeforeUpdate(){
            if(!localStorage.token)
                this.props.history.push('/admin')
        }
        componentDidUpdate(){
            if(!localStorage.token)
                this.props.history.push('/admin')
        }
        render() {
            return (
                <ProtectedComponent {...this.props}/>
            );
        }
    }
    return withRouter(Authorized)
}