import React from 'react'

const TileItem = ({tiles}) => {

    return(
        <> 
                    {tiles.map((tile) => (

                        <div class="product-item">
                            <a href="/catalogue-page.html" class="product-link">
                                <h3 class="product__title">
                                    {tile.title}
                                </h3>
                                <div class="product-image-wrapper">
                                    <img src={tile.images[0]} alt="Product image" class="product__image" />
                                </div>
                                <span class="product__size">
                                    {tile.width} x {tile.height}
                                </span>
                                <span class="product__price">
                                    {tile.color_price.grey}
                                </span>
                            </a>
                            <div class="product-order">
                                <button class="product__btn--remove">
                                    <svg class="icon icon-minus">
                                        <use href="images/icons/sprite.svg#minus"></use>
                                    </svg>
                                </button>
                                <input type="number" class="product__count" min="1" value="1" />
                                <button class="product__btn--add">
                                    <svg class="icon icon-plus">
                                        <use href="images/icons/sprite.svg#plus"></use>
                                    </svg>
                                </button>

                                <button class="product__cart">
                                    <svg class="icon icon-cart">
                                        <use href="images/icons/sprite.svg#cart"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
        </>
    )
};

export default TileItem;