import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export default function authRequired(ProtectedComponent){
    class Authorized extends Component {
        async componentDidMount() {
            try {
                await axios.get('http://localhost:5000/admin/checktoken');
            } catch (err) {
                localStorage.removeItem('token');
                this.props.history.push('/admin');
                throw err;
            }
        }
        async getSnapshotBeforeUpdate() {
            try {
                await axios.post('http://localhost:5000/admin/checktoken');
            } catch (err) {
                localStorage.removeItem('token');
                this.props.history.push('/admin');
                throw err;
            }
        }
        async componentDidUpdate() {
            try {
                await axios.post('http://localhost:5000/admin/checktoken');
            } catch (err) {
                localStorage.removeItem('token');
                this.props.history.push('/admin');
                throw err;
            }
        }
        render() {
            return (
                <ProtectedComponent {...this.props}/>
            );
        }
    }
    return withRouter(Authorized)
}