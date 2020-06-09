import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TilesList from '../../../../components/tiles-list';

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

    editFunc=(id)=> {
        this.props.history.push(`/admin/edit/tile/${id}`)
    }

    deleteFunc = async (id) => {
        await axios.delete(`http://localhost:5000/admin/tiles/${id}`);
    }
    render() { 
        const {tiles} = this.state;

        return (
            <Fragment>
               <header>
                   <nav>
                       <a href="/admin/add/tile">Додати товар</a>
                   </nav>
               </header>

               <TilesList tiles={tiles} editFunc={this.editFunc} deleteFunc={this.deleteFunc} />
            </Fragment>
         );
    }
}
 
export default MainTile;