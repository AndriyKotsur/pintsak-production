import React from 'react';

const TilesList = ({ tiles, editFunc, deleteFunc }) => {
  return (
    <>
      {tiles && tiles.map((tile) => (
        <div key={tile.tile_uid} className="product-item">
        <a href={`http://localhost:5000/tiles/${tile.tile_uid}`} className="product-link" target="_blank" rel="noopener noreferrer">
          <h3 className="product__title">{tile.title}</h3>
          <div className="product-image-wrapper">
            <img src={tile.images[0]} alt="Product alt" className="product__image"/>
          </div>
        </a>
        <div className="product-order">
          <button onClick={() => editFunc(tile.tile_uid)} className="product__btn--add">
            Редагувати
          </button>
          <button onClick={() => deleteFunc(tile.tile_uid)} className="product__btn--remove">
            Видалити
          </button>
        </div>
      </div>
      ))}
    </>
  );
}

export default TilesList;