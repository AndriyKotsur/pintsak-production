import React, { Component, Fragment } from 'react';
import axios from 'axios';

class AddTile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: null,
            title_url: null,
            type: null,
            images: [],
            imagesPreview: [],
            width: null,
            height: null,
            thickness: null,
            color_price: [],
            priceG: null,
            priceR: null,
            priceY: null,
            priceBr: null,
            priceBl: null,
            weight_per_meter: null,
            pieces_per_meter: null,
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
        const { types, priceG, priceR, priceY, priceBr, priceBl, title, title_url, type, width, height, thickness, color_price, weight_per_meter, pieces_per_meter, images } = this.state;
        const formData = new FormData();

        types.map(el => {
            if (el.title === type) {
                formData.append("folderName", el.title_url);
            }
        });

        formData.append("title_url", title_url);
        formData.append("title", title);
        formData.append("type", type);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("thickness", thickness);
        formData.append("weight_per_meter", weight_per_meter);
        formData.append("pieces_per_meter", pieces_per_meter);
        
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        };

        color_price.push(
            JSON.stringify(priceG),
            JSON.stringify(priceR),
            JSON.stringify(priceY),
            JSON.stringify(priceBr),
            JSON.stringify(priceBl)
            );
        formData.append("color_price[]", color_price);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        try {
            axios.post("http://localhost:5000/admin/tiles/add", formData , config );
            window.location = '/admin/main/tile';
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
        this.setState({
            [e.target.name]: {
                [e.target.name]: e.target.value
            }
        });
    }

    onImageChange = e => {
        let imageObj = [];
        imageObj.push(e.target.files);
        let imageArr = [];
        let imagePre = [];
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
        const { errMsg, types, imagesPreview } = this.state;
        return ( 
            <Fragment>
                <div className="contact-us">
                    <div className="container">
                        <div className="contact-us-inner">
                            <h2 className="contact-us__title">
                                Додати товар
                            </h2>
                            <form onSubmit={this.onSubmit} className="form contact-us-form">
                                <div className="input-field contact-us-field">
                                    <input type="file" name="images" onChange={this.onImageChange} className="input contact-us__input" multiple/>
                                    {
                                        
                                        (imagesPreview.length > 0 )? 
                                        (imagesPreview.map(image => (
                                            <img src={image} alt="Image item"/>
                                        ))): ''
                                    }
                                    <label>Картинка товару</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input type="text" name="title" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="text" name="title_url" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва товару (aнгл)</label>
                                </div>

                                <div>

                                    <select name="type" onChange={this.onChange} className="input contact-us__input" required>
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

                                <div className="input-field contact-us-field">
                                    <input type="number" name="width" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ширина товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="height" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Висота товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="thickness" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Товщина товару</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input type="number" name="weight_per_meter" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Вага на метр кв.</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input type="number" name="pieces_per_meter" onChange={this.onChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Кількість на метр кв.</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input type="number" name="priceG" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна сірої</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="priceR" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна червоної</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="priceY" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна жовтої</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="priceBr" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна корич</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="number" name="priceBl" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна чорної</label>
                                </div>

                                <p className="contact-us__required">обов’язкові поля</p>
                                <button className="contact-us__btn">Пітвердити</button>
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