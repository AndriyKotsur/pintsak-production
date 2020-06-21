import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TilesList from '../../../../components/tiles-list';
import AdminMain from '../admin-main';

class MainTile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount () {
        try {
            const res = await axios.get("http://localhost:5000/admin/tiles");
            this.setState({
                tiles: res.data
            })
        } catch (err) {
            throw err;
        }
    }

    editFunc = id => {
        this.props.history.push(`/admin/edit/tile/${id}`)
    }

    deleteFunc = async id => {
        await axios.delete(`http://localhost:5000/admin/tiles/${id}`);
        window.location = '/admin/main/tile';
    }
    render() { 
        const { tiles } = this.state;

        return (
            <Fragment>
               <header>
                   <AdminMain/>
                   <nav>
                       <Link to="/admin/add/tile">Додати товар</Link>
                   </nav>
               </header>

               <TilesList tiles={tiles} editFunc={this.editFunc} deleteFunc={this.deleteFunc} />
            </Fragment>
         );
    }
}
 
export default MainTile;