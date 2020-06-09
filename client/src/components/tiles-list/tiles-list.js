import React, {Fragment} from 'react';

const TilesList = ({tiles, editFunc, deleteFunc}) => {
    return (
        <Fragment>
            {
                (tiles && tiles.length)?(
                    tiles.map((tile)=>(
                        <div key={tile.tile_uid} class="product-item">
                        <a href="#" class="product-link" target="_blank">
                            <h3 class="product__title">
                                {tile.title}
                            </h3>
                            <div class="product-image-wrapper">
                                <img src={tile.images[0]} alt="Product image" class="product__image"/>
                            </div>
                        </a>
                        <div class="product-order">
                            <button onClick={() => editFunc(tile.tile_uid)} class="product__btn--add">
                                Edit
                            </button>
                            <button onClick={() => deleteFunc(tile.tile_uid)} class="product__btn--remove">
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