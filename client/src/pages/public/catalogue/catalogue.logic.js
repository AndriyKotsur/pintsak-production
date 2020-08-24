import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import { HTTP } from '../../../helpers';

const useCatalogue = () => {
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [tiles, setTiles] = useState();
  const [types, setTypes] = useState();
  const [typeTitle, setTypeTitle] = useState();

  useEffect(()=>{
    const fetchTypes = async () => {
      const res = await HTTP.getTypes();
      console.log(res);
      setTypes(res);
      const typeTitle = res.filter((type) => type.title_url === params.type);
      setTypeTitle(typeTitle[0].title);
    };

    fetchTypes();

  }, []);

  useEffect(() => {
    const fetchTiles = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/tiles/types/${params.type}${location.search}`);
      setTiles(res.data);
      setLoading(false);
    };

    fetchTiles();

  }, [params.type, location.search]);

  return {
    loading,
    tiles,
    types,
    typeTitle,
  }
};

export default useCatalogue;
