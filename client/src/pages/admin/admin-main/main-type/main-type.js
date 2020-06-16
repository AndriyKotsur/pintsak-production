import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TypesList from '../../../../components/types-list';

class MainType extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount () {
        try {
            const res = await axios.get("http://localhost:5000");
            this.setState({
                types: res.data
            })
        } catch (err) {
            throw err;
        }
    }

    editFunc=(id)=> {
        this.props.history.push(`/admin/edit/type/${id}`)
    }

    deleteFunc = async (id) => {
        await axios.delete(`http://localhost:5000/admin/tilestype/${id}`);
        window.location = '/admin/main/type';
    }
    render() { 
        const {types} = this.state;

        return (
            <Fragment>
               <header>
                   <nav>
                       <a href="/admin/add/type">Додати категорію</a>
                   </nav>
               </header>

               <TypesList types={types} editFunc={this.editFunc} deleteFunc={this.deleteFunc} />
            </Fragment>
         );
    }
}
 
export default MainType;