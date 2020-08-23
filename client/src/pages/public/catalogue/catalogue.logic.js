import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const useCatalogue = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [tiles, setTiles] = useState();
    const [types, setTypes] = useState();
    const [typeTitle, setTypeTitle] = useState();

    useEffect(()=>{
        const fetchTypes = async () => {
            const res = await axios.get('http://localhost:5000/');
            setTypes(res.data);
            const typeTitle = res.data.filter((type) => type.title_url === params.type);
            setTypeTitle(typeTitle[0].title);
        };

        fetchTypes();
        
        const fetchTiles = async () => {
            setLoading(true);
            const typeId = 'bb58b88c-5937-4d9e-9267-0b1780f8d697';
            const res = await axios.get(`http://localhost:5000/tiles/types/${typeId}`);
            setTiles(res.data);
            setLoading(false);
        };

        fetchTiles();

    }, []);

    return {
        loading,
        tiles,
        types,
        typeTitle
    }
};

export default useCatalogue;
