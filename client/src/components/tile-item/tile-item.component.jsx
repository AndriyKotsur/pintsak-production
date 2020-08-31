import React from 'react'
import { Icon } from '../';

const TileItem = ({ tiles }) => {
  return (
    <> 
      {tiles.map((tile) => (
        <div key={tile.tile_uid} className="product-item">
          <a href="/catalogue-page.html" className="product-link">
            <h3 className="product__title">{tile.title}</h3>
            <div className="product-image-wrapper">
              <img src={tile.images[0]} alt="Product" className="product__image" />
            </div>
            <span className="product__size">
              {tile.width.slice(0, -3)} x {tile.height.slice(0, -3)}
            </span>
            <span className="product__price">
              {tile.color_price.grey}
            </span>
          </a>
          <div className="product-order">
            <button className="product__btn--remove">
              <Icon name='minus' className='icon icon-minus' />
            </button>
            <input type="number" className="product__count" min="1" value="1" />
            <button className="product__btn--add">
              <Icon name='plus' className='icon icon-plus' />
            </button>
            <button className="product__cart">
              <Icon name='cart' className='icon icon-cart' />
            </button>
          </div>
        </div>
      ))}
    </>
  )
};

export default TileItem;