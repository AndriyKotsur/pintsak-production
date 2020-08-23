import React from 'react';
import useCatalogue from './catalogue.logic';

import TileItem from '../../../components/tile-item';


const Catalogue = () => {
    const {loading, tiles, types, typeTitle} = useCatalogue();

    return(
        <>
            <div class="catalogue-wrapper">
                {types && typeTitle && (
                    <div class="catalogue-header">
                        <h1 class="catalogue__title">
                            {typeTitle}
                        </h1>
                        <div class="catalogue-sort">
                            <span class="catalogue-sort__title">Сортування:</span>
                            <div class="catalogue-sort__block">
                                <a href="#" class="catalogue-sort__size">
                                    за розміром
                                    <svg class="icon icon-arrow--sort catalogue-sort__icon">
                                        <use href="images/icons/sprite.svg#arrow-sort"></use>
                                    </svg>
                                </a>
                                <a href="#" class="catalogue-sort__price">
                                    за ціною
                                    <svg class="icon icon-arrow--sort catalogue-sort__icon">
                                        <use href="images/icons/sprite.svg#arrow-sort"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {tiles && (
                    <div class="catalogue-block">
                        <TileItem tiles = {tiles}/>
                    </div>
                )}

                    <div class="catalogue-pagination">
                        <a href="#" class="catalogue-pagination__btn">
                            <svg class="icon icon-refresh pagination-icon__refresh">
                                <use href="images/icons/sprite.svg#refresh"></use>
                            </svg>
                            Показати ще 12 товарів
                        </a>

                        <div class="catalogue-pagination-block">
                            <a href="#" class="catalogue-pagination__step">
                                <svg class="icon icon-arrow--pagination pagination-icon__left">
                                    <use href="images/icons/sprite.svg#arrow"></use>
                                </svg>
                            </a>
                            <div class="catalogue-pagination-pages">
                                <a href="#" class="catalogue-pagination__link">1</a>
                                <a href="#" class="catalogue-pagination__link">2</a>
                                <a href="#" class="catalogue-pagination__link">3</a>
                                <a href="#" class="catalogue-pagination__link">4</a>
                            </div>
                            <a href="#" class="catalogue-pagination__step">
                                <svg class="icon icon-arrow--pagination pagination-icon__right">
                                    <use href="images/icons/sprite.svg#arrow"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
        </>
    )
};

export default Catalogue;