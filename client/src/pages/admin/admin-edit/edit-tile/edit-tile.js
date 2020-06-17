import React, { Component, Fragment } from 'react';
import axios from 'axios';

class EditTile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: null,
            images: [],
            imagesPreview: [],
            imagesPrevious: [],
            priceG: null,
            priceR: null,
            priceY: null,
            priceBr: null,
            priceBl: null,
            errMsg: ''
         }
        this.titleRef = React.createRef();
        this.title_urlRef = React.createRef();
        this.typeRef = React.createRef();
        this.widthRef = React.createRef();
        this.heightRef = React.createRef();
        this.thicknessRef = React.createRef();
        this.priceGRef = React.createRef();
        this.priceRRef = React.createRef();
        this.priceYRef = React.createRef();
        this.priceBrRef = React.createRef();
        this.priceBlRef = React.createRef();
        this.weight_per_meterRef = React.createRef();
        this.pieces_per_meterRef = React.createRef();
    }
    
    async componentDidMount() {
        const tileId = this.props.match.params.id;
        try {
            const resTile = await axios.get(`http://localhost:5000/tiles/${tileId}`);
            const tile = resTile.data;
            this.setState({
                imagesPrevious: tile.images
            })
            
            this.titleRef.current.value = tile.title;
            this.title_urlRef.current.value = tile.title_url;
            this.typeRef.current.value = tile.type;
            this.widthRef.current.value = tile.width;
            this.heightRef.current.value = tile.height;
            this.thicknessRef.current.value = tile.thickness;

            const strArr = tile.color_price[0].split(',');
            const arr = [];
            for (let i = 0; i < strArr.length; i++) {
                arr.push(JSON.parse(strArr[i]));
            }
            this.priceGRef.current.value = arr[0].priceG;
            this.priceRRef.current.value = arr[1].priceR;
            this.priceYRef.current.value = arr[2].priceY;
            this.priceBrRef.current.value = arr[3].priceBr;
            this.priceBlRef.current.value = arr[4].priceBl;

            this.weight_per_meterRef.current.value = tile.weight_per_meter;
            this.pieces_per_meterRef.current.value = tile.pieces_per_meter;

            const resType = await axios.get(`http://localhost:5000`);
            this.setState({
                types: resType.data
            })
        } catch (err) {
            throw err;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { priceG, priceR, priceY, priceBr, priceBl, types, images } = this.state;
        const formData = new FormData();

        types.map(el => {
            if (el.title === this.typeRef.current.value) {
                formData.append("folderName", el.title_url);
            }
        });

        formData.append("title_url", this.title_urlRef.current.value);
        formData.append("title", this.titleRef.current.value);
        formData.append("type", this.typeRef.current.value);
        formData.append("width", this.widthRef.current.value);
        formData.append("height", this.heightRef.current.value);
        formData.append("thickness", this.thicknessRef.current.value);
        formData.append("weight_per_meter", this.weight_per_meterRef.current.value);
        formData.append("pieces_per_meter", this.pieces_per_meterRef.current.value);
        
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        };
        const color_price = [];
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
            const tileId = this.props.match.params.id;
            axios.put(`http://localhost:5000/admin/tiles/${tileId}`, formData , config );
            window.location = '/admin/main/tile';
        } catch (err) {
            this.setState({
                errMsg:err.message
            })
        }
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

    onColorChange = e => {
        this.setState({
            [e.target.name]: {
                [e.target.name]: e.target.value
            }
        });
    }

    render() { 
        const { errMsg, types, imagesPreview, imagesPrevious } = this.state;
        
        return (
            <Fragment>
                <div className="contact-us">
                    <div className="container">
                        <div className="contact-us-inner">
                            <h2 className="contact-us__title">
                                Редагувати товар
                            </h2>
                            <form onSubmit={this.onSubmit} className="form contact-us-form">
                                <div>
                                    <label>Попередні картинки</label>
                                    {
                                        imagesPrevious.map(image => (
                                            <img src={image} alt="Image item"/>
                                        ))
                                    }
                                </div>
                                <div className="input-field contact-us-field">
                                    <input type="file" name="images" onChange={this.onImageChange} className="input contact-us__input" multiple/>
                                    {
                                        
                                        (imagesPreview.length > 0 )? 
                                        (imagesPreview.map(image => (
                                            <img src={image} alt="Image item"/>
                                        ))): ''
                                    }
                                    <label>Нові картинки</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input ref={this.titleRef} type="text" name="title" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.title_urlRef} type="text" name="title_url" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва товару (aнгл)</label>
                                </div>

                                <div>

                                    <select ref={this.typeRef} name="type" className="input contact-us__input" required>
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
                                    <input ref={this.widthRef} type="number" name="width" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ширина товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.heightRef} type="number" name="height" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Висота товару</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.thicknessRef} type="number" name="thickness" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Товщина товару</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input ref={this.weight_per_meterRef} type="number" name="weight_per_meter" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Вага на метр кв.</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input ref={this.pieces_per_meterRef} type="number" name="pieces_per_meter" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Кількість на метр кв.</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input ref={this.priceGRef} type="number" name="priceG" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна сірої</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.priceRRef} type="number" name="priceR" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна червоної</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.priceYRef} type="number" name="priceY" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна жовтої</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.priceBrRef} type="number" name="priceBr" onChange={this.onColorChange} className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Ціна корич</label>
                                </div>
                                <div className="input-field contact-us-field">
                                    <input ref={this.priceBlRef} type="number" name="priceBl" onChange={this.onColorChange} className="input contact-us__input" required/>
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
 
export default EditTile;