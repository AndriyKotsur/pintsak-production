import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCatalogue from './catalogue.logic';
import { Icon, TileItem, AsideNavigation } from '../../../components';

const Catalogue = () => {
  const {loading, tiles, types, typeTitle} = useCatalogue();
  const [sortByWidth, setSortByWidth] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  return (
    <div className="catalogue">
      <div className="container">
        <div className="catalogue-inner">
          <div className="catalogue-aside">
            <AsideNavigation types={types} />
          </div>
          <div className="catalogue-wrapper">
            {types && typeTitle && (
              <div className="catalogue-header">
                <h1 className="catalogue__title">{typeTitle}</h1>
                <div className="catalogue-sort">
                  <span className="catalogue-sort__title">Сортування:</span>
                  <div className="catalogue-sort__block">
                    <Link to={`?sort=width&order=${sortByWidth ? 'ASC' : 'DESC'}`} className="catalogue-sort__size" onClick={() => setSortByWidth(!sortByWidth)} >
                      за розміром
                      <Icon name='arrowSort' className={`icon icon-arrow--sort catalogue-sort__icon ${sortByWidth ? "isActive" : ""}`} />
                    </Link>
                    <Link to={`?sort=price&order=${sortByPrice ? 'ASC' : 'DESC'}`} className="catalogue-sort__price" onClick={() => setSortByPrice(!sortByPrice)}>
                      за ціною
                      <Icon name='arrowSort' className={`icon icon-arrow--sort catalogue-sort__icon ${sortByPrice ? "isActive" : ""}`} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {tiles && (
              <div className="catalogue-block">
                <TileItem tiles={tiles} />
              </div>
            )}
            <div className="catalogue-pagination">
              <a href="#" className="catalogue-pagination__btn">
                <svg className="icon icon-refresh pagination-icon__refresh">
                  <use href="images/icons/sprite.svg#refresh"></use>
                </svg>
                Показати ще 12 товарів
              </a>
              <div className="catalogue-pagination-block">
                <a href="#" className="catalogue-pagination__step">
                  <svg className="icon icon-arrow--pagination pagination-icon__left">
                    <use href="images/icons/sprite.svg#arrow"></use>
                  </svg>
                </a>
                <div className="catalogue-pagination-pages">
                  <a href="#" className="catalogue-pagination__link">1</a>
                  <a href="#" className="catalogue-pagination__link">2</a>
                  <a href="#" className="catalogue-pagination__link">3</a>
                  <a href="#" className="catalogue-pagination__link">4</a>
                </div>
                <a href="#" className="catalogue-pagination__step">
                  <svg className="icon icon-arrow--pagination pagination-icon__right">
                    <use href="images/icons/sprite.svg#arrow"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Catalogue;