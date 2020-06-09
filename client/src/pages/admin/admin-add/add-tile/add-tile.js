import React, { Component, Fragment } from 'react';
import axios from 'axios';

class AddTile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            type: '',
            images: [],
            imagesPre: [],
            width: null,
            height: null,
            thickness: null,
            color: ['as', 'asd'],
            weight_per_meter: null,
            pieces_per_meter: null,
            price: null,

            errMsg: '',
         }
    }

    async componentDidMount() {
        try {
            const res = await axios.get("http://localhost:5000");
            console.log(res);
            this.setState({
                types: res.data
            })
            
        } catch (err) {
            throw err;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('images', this.state.images);
        formData.append("title", this.state.title);
        formData.append("type", this.state.type);
        formData.append("width", this.state.width);
        formData.append("height", this.state.height);
        formData.append("thickness", this.state.thickness);
        formData.append("color[]", this.state.color);
        formData.append("weight_per_meter", this.state.weight_per_meter);
        formData.append("pieces_per_meter", this.state.pieces_per_meter);
        formData.append("price", this.state.price);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        try {
            axios.post("http://localhost:5000/admin/tiles/add", formData, config)
            this.props.history.push("/admin/main/tile");
        } catch (err) {
            this.setState({
                errMsg:err.message
            })
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onColorChange = e => {
        // let colorArr = [];
        // colorArr.push(e.target.value)
        // console.log(colorArr);
        // this.setState({
        //     color: colorArr
        // })
    }

    onImageChange = e => {
        let imageObj = [];
        let imageArr = [];
        imageObj.push(e.target.files);
        for(let i = 0; i < imageObj[0].length; i++) {
            imageArr.push(URL.createObjectURL(imageObj[0][i]))
        }
        this.setState({
            images: e.target.files[0],
            imagesPre: imageArr
        })
        console.log(imageObj[0]);
        
    }
    render() { 
        const {errMsg, types, imagesPre} = this.state;
        //console.log(imagesPre);

        return ( 
            <Fragment>
                <div class="contact-us">
                    <div class="container">
                        <div class="contact-us-inner">
                            <h2 class="contact-us__title">
                                Додати товар
                            </h2>
                            <form onSubmit={this.onSubmit} class="form contact-us-form">
                                <div class="input-field contact-us-field">
                                    <input type="file" name="images" onChange={this.onImageChange} class="input contact-us__input" multiple/>
                                    {
                                        
                                        (imagesPre.length > 0 )? 
                                        (imagesPre.map(image => (
                                            <img src={image} alt="Image item"/>
                                        ))): ''
                                    }
                                    <label>Картинка товару</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input type="text" name="title" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Назва товару</label>
                                </div>

                                <div>

                                    <select name="type" onChange={this.onChange} class="input contact-us__input" required>
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
                                    <input type="number" name="width" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Ширина товару</label>
                                </div>
                                <div class="input-field contact-us-field">
                                    <input type="number" name="height" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Висота товару</label>
                                </div>
                                <div class="input-field contact-us-field">
                                    <input type="number" name="thickness" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Товщина товару</label>
                                </div>

                                <div>
                                    <select name="color" onChange={this.onColorChange}>
                                        <option>Червоний</option>
                                        <option>Жовтий</option>
                                        <option>Синій</option>
                                    </select>
                                    <label>Колір товару</label>
                                </div> 

                                <div class="input-field contact-us-field">
                                    <input type="number" name="weight_per_meter" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Вага на метр кв.</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input type="number" name="pieces_per_meter" onChange={this.onChange} class="input contact-us__input" required/>
                                    <label class="label contact-us__label">Кількість на метр кв.</label>
                                </div>

                                <div class="input-field contact-us-field">
                                    <input type="number" name="price" onChange={this.onChange} class="input contact-us__input" required/>
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
 
export default AddTile;