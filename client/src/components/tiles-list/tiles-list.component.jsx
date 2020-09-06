import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'

const TilesList = ({ tiles }) => {
  const history = useHistory()
  const onDeleteTile = async (id) => {
    await HTTP.deleteTile(id)
    window.location = '/admin/main/tile'
  }
  return (
    <>
      {tiles && tiles.map((tile) => (
        <div key={tile.tile_uid} className="product-item">
        <Link to={`/tiles/${tile.tile_uid}`} className="product-link" target="_blank" rel="noopener noreferrer">
          <h3 className="product__title">{tile.title}</h3>
          <div className="product-image-wrapper">
            <img src={tile.images[0]} alt="Product alt" className="product__image"/>
          </div>
        </Link>
        <div className="product-order">
          <button onClick={() => history.push(`/admin/edit/tile/${tile.tile_uid}`)} className="product__btn--add">
            Редагувати
          </button>
          <button onClick={() => {onDeleteTile(tile.tile_uid)}} className="product__btn--remove">
            Видалити
          </button>
        </div>
      </div>
      ))}
    </>
  );
}

export default TilesList;