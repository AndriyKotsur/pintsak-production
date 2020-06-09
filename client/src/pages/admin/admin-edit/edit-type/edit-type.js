import React, { Component, Fragment } from 'react';
import axios from 'axios';

class EditType extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errMsg: ''
         }
    }
    
    async componentDidMount() {
        const tileId = this.props.match.params.id;
        console.log(this.props);
        
        try {
            const res = await axios.get(`http://localhost:5000/tilestype/${tileId}`);

        } catch (err) {
            throw err;
        }
    }

    render() { 
        const {errMsg, types} = this.state;
        return (
            <Fragment>
                <div class="contact-us">
                    <div class="container">
                        <div class="contact-us-inner">
                            <h2 class="contact-us__title">
                                Редагувати категорію
                            </h2>
                            <form onSubmit={this.onSubmit} class="form contact-us-form">
                                <div class="input-field contact-us-field">
                                    <input type="text" name="title" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Назва категорії</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input type="text" name="title_en" onChange={this.onChange} class="input contact-us__input" required/>
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
 
export default EditType;