import React, { Component, Fragment } from 'react';
import axios from 'axios';

class EditTile extends Component {
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
            const res = await axios.get(`http://localhost:5000/tiles/${tileId}`);

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
                                Редагувати товар
                            </h2>
                            <form onSubmit={this.onSubmit} class="form contact-us-form">
                                <div class="input-field contact-us-field">
                                    <input type="file" name="images" onChange={this.onImageChange} class="input contact-us__input" multiple/>
                                    <label>Картинка товару</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input ref="title" type="text" name="title" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Назва товару</label>
                                </div>

                                <div>

                                    <select ref="type" name="type" onChange={this.onChange} class="input contact-us__input" required>
                                        {
                                            (types && types.length)?(
                                                types.map((type)=>(
                                                <option key={type.type_uid}>{type.title}</option>
                                                ))
                                            ): <option>Нема доданих категорій</option>
                                        }
                                    </select>
                                    <label>Категорія товару</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input ref="width" type="number" name="width" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Ширина товару</label>
                                </div>
                                <div class="input-field contact-us-field">
                                    <input ref="height" type="number" name="height" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Висота товару</label>
                                </div>
                                <div class="input-field contact-us-field">
                                    <input ref="thickness" type="number" name="thickness" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Товщина товару</label>
                                </div>

                                <div>
                                    <select ref="color" name="color" onChange={this.onChange}>
                                        <option>Червоний</option>
                                        <option>Жовтий</option>
                                        <option>Синій</option>
                                    </select>
                                    <label>Колір товару</label>
                                </div> 

                                <div class="input-field contact-us-field">
                                    <input ref="weight_per_meter" type="number" name="weight_per_meter" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Вага на метр кв.</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input ref="pieces_per_meter" type="number" name="pieces_per_meter" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Кількість на метр кв.</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input ref="price" type="number" name="price" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Ціна</label>
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
 
export default EditTile;