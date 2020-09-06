import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { HTTP } from '../../../../helpers'

const useEditTile = () => {
  const { id } = useParams()
  const [tile, setTile] = useState()
  const [types, setTypes] = useState([])

  useEffect(()=>{
    const fetchTypes = async () => {
      const response = await HTTP.getTypes();
      setTypes(response);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchTile = async () => {
      const response = await HTTP.getTile(id)
      setTile(response)
    }
    fetchTile()
  }, [id])

  return {
    tile,
    types,
  }
}

export default useEditTile