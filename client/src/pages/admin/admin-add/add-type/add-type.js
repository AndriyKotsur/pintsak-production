import React, { Component, Fragment } from 'react';
import axios from 'axios';

class AddType extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            title_url: '',
            errMsg: ''
         }
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const type = {
            title: this.state.title,
            title_url: this.state.title_url
        };

        try {
            axios.post("http://localhost:5000/admin/tilestype/add", type);
            window.location = '/admin/main/type';
        } catch (err) {
            throw err;
        }
    }
    render() { 
        const {errMsg} = this.state;
        return ( 
            <Fragment>
                <div class="contact-us">
                    <div class="container">
                        <div class="contact-us-inner">
                            <h2 class="contact-us__title">
                                Додати категорію
                            </h2>
                            <form onSubmit={this.onSubmit} class="form contact-us-form">

                                <div class="input-field contact-us-field">
                                    <input type="text" name="title" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Назва категорії</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input type="text" name="title_url" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Назва категорії (англ.)</label>
                                </div>

                                <p class="contact-us__required">обов’язкові поля</p>
                                <button class="contact-us__btn">Пітвердити</button>
                            </form>
                            {
                                errMsg ? errMsg: ''
                            }
                        </div>
                    </div>
                </div>
        </Fragment>
         );
    }
}
 
export default AddType;