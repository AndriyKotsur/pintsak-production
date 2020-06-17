import React, { Component, Fragment } from 'react';
import axios from 'axios';

class EditTile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: null,
            images: [],
            imagesPreview: [],
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
            console.log(tile);
            
            this.titleRef.current.value = tile.title;
            this.title_urlRef.current.value = tile.title_url;
            this.typeRef.current.value = tile.type;
            this.widthRef.current.value = tile.width;
            this.heightRef.current.value = tile.height;
            this.thicknessRef.current.value = tile.thickness;
            console.log(tile.color_price);
            for (let i = 0; i < 1; i++) {
                console.log(tile.color_price[i]);
                
            }
            tile.color_price.map(price => {
                console.log(price);
                
            })
            
            // const price = {
            //     priceG: tile.color_price[0].priceG,
            //     priceR: tile.color_price[1].priceR,
            //     priceY: tile.color_price[2].priceY,
            //     priceBr: tile.color_price[3].priceBr,
            //     priceBl: tile.color_price[4].priceBl
            // }
            // console.log(tile.color_price.length);
            
            this.priceGRef.current.value = tile.priceG;
            this.priceRRef.current.value = tile.priceR;
            this.priceYRef.current.value = tile.priceY;
            this.priceBrRef.current.value = tile.priceBr;
            this.priceBlRef.current.value = tile.priceBl;
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

    render() { 
        const { errMsg, types, imagesPreview } = this.state;
        return (
            <Fragment>
                <div className="contact-us">
                    <div className="container">
                        <div className="contact-us-inner">
                            <h2 className="contact-us__title">
                                Редагувати товар
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