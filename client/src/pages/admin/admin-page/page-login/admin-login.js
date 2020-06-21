import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: ""
         }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    onSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state;
        const admin = {
            "email": email,
            "password": password
        }

        try {
            const res = await axios.post("http://localhost:5000/admin", admin);
            this.props.setUser(res.data.token);
            this.props.history.push("/admin/main");

        } catch (err) {
            throw err;
        }
    }
    render() { 
        return ( 
            <Fragment>
                <div class="contact-us">
                    <div class="container">
                        <div class="contact-us-inner">
                            <h2 class="contact-us__title">
                                Вхід в профіль
                            </h2>
                            <form onSubmit={this.onSubmit} class="form contact-us-form">
                                <div class="input-field contact-us-field">
                                    <input type="email" name="email" value={this.state.email} onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Логін</label>
                                </div>
                                <div class="input-field contact-us-field">
                                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Пароль</label>
                                </div>
                                <p class="contact-us__required">обов’язкові поля</p>
                                <button class="contact-us__btn">Увійти</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
         );
    }
}
 
export default withRouter(AdminLogin);