import React, { Component, Fragment } from 'react';
import axios from 'axios';

class AddTile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: null,
            type: null,
            images: [],
            imagesPreview: [],
            width: null,
            height: null,
            thickness: null,
            color: [],
            weight_per_meter: null,
            pieces_per_meter: null,
            price: null,
            errMsg: null,
         };
    }

    async componentDidMount() {
        try {
            const res = await axios.get("http://localhost:5000");
            this.setState({
                types: res.data
            })
        } catch (err) {
            throw err;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { title, type, width, height, thickness, color, weight_per_meter, pieces_per_meter, price, images } = this.state;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        formData.append("folderName", type);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("thickness", thickness);
        formData.append("weight_per_meter", weight_per_meter);
        formData.append("pieces_per_meter", pieces_per_meter);
        formData.append("price", price);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        for (let i = 0; i < color.length; i++) {
            formData.append(`color[]`, color[i]);
        }
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        try {
            axios.post("http://localhost:5000/admin/tiles/add", formData , config );
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
        let colorArr = [];
        colorArr.push(e.target.value);
        this.setState({
            color: colorArr
        });
    }

    onImageChange = e => {
        let imageObj = [];
        let imageArr = [];
        let imagePre = [];
        imageObj.push(e.target.files);
        for(let i = 0; i < imageObj[0].length; i++) {
            imagePre.push(URL.createObjectURL(imageObj[0][i]));
            imageArr.push(imageObj[0][i]);
        }
        this.setState({
            images: imageArr,
            imagesPreview: imagePre
        })
    }
    render() { 
        const {errMsg, types, imagesPreview} = this.state;
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
                                        
                                        (imagesPreview.length > 0 )? 
                                        (imagesPreview.map(image => (
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
                                            ): <option>Немає доданих категорій</option>
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