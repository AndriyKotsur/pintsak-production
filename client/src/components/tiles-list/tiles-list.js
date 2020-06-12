import React, {Fragment} from 'react';

const TilesList = ({tiles, editFunc, deleteFunc}) => {
    return (
        <Fragment>
            {
                (tiles && tiles.length)?(
                    tiles.map((tile)=>(                        
                        <div key={tile.tile_uid} className="product-item">
                        <a href="#" className="product-link" target="_blank">
                            <h3 className="product__title">
                                {tile.title}
                            </h3>
                            <div className="product-image-wrapper">
                                <img src={tile.images[0]} alt="Product image" className="product__image"/>
                            </div>
                        </a>
                        <div className="product-order">
                            <button onClick={() => editFunc(tile.tile_uid)} className="product__btn--add">
                                Edit
                            </button>
                            <button onClick={() => deleteFunc(tile.tile_uid)} className="product__btn--remove">
                                Delete
                            </button>
                        </div>
                    </div>

                    ))
                ): "Нема створених продуктів"
            }
        </Fragment>
    );
} 

export default TilesList;