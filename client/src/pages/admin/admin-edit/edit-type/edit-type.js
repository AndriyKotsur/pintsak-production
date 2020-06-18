import React, { Component, Fragment } from 'react';
import axios from 'axios';

class EditType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMsg: ''
         }
        this.titleRef = React.createRef();
        this.title_urlRef = React.createRef();
    }
    
    async componentDidMount() {
        const typeId = this.props.match.params.id;
        
        try {
            const res = await axios.get(`http://localhost:5000/admin/tilestype/${typeId}`);
            this.titleRef.current.value = res.data.title;
            this.title_urlRef.current.value = res.data.title_url;
        } catch (err) {
            throw err;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const type = {
            title: this.titleRef.current.value,
            title_url: this.title_urlRef.current.value
        }
        try {
            const typeId = this.props.match.params.id;
            axios.put(`http://localhost:5000/admin/tilestype/${typeId}`, type)
            window.location = '/admin/main/type';
        } catch (err) {
            throw err;
        }
    }

    render() { 
        const { errMsg } = this.state;
        
        return (
            <Fragment>
                <div className="contact-us">
                    <div className="container">
                        <div className="contact-us-inner">
                            <h2 className="contact-us__title">
                                Редагувати категорію
                            </h2>
                            <form onSubmit={this.onSubmit} className="form contact-us-form">
                                <div className="input-field contact-us-field">
                                    <input type="text" ref={this.titleRef} name="title" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва категорії</label>
                                </div>

                                <div className="input-field contact-us-field">
                                    <input type="text" ref={this.title_urlRef} name="title_url" className="input contact-us__input" required/>
                                    <label className="label contact-us__label">Назва категорії (англ.)</label>
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
 
export default EditType;