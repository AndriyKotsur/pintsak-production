import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { HTTP } from '../../../../helpers'

const useEditTile = () => {
  const { id } = useParams()
  const history = useHistory()
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

  const updateTile = async (e, ...args) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      types.forEach(item => {
        if (item.title === args[2]) formData.append("folderName", item.title_url);
      });
      formData.append("title", args[0]);
      formData.append("title_url", args[1]);
      formData.append("type", args[2]);
      formData.append("width", args[3]);
      formData.append("height", args[4]);
      formData.append("thickness", args[5]);
      formData.append("weight_per_meter", args[12]);
      formData.append("pieces_per_meter", args[13]);
      const color_price = {
        grey: args[6],
        yellow: args[7],
        orange: args[8],
        red: args[9],
        brown: args[10],
        black: args[11],
      }
      formData.append("color_price", JSON.stringify(color_price));
      for (let i = 0; i < args[14].length; i++) {
        formData.append('images', args[14][i]);
      };

      await HTTP.updateTile( id, formData )
      history.push('/admin/main/tile')
    } catch (err) {}
  }

  return {
    tile,
    types,
    updateTile,
  }
}

export default useEditTile