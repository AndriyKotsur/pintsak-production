import React from 'react'
import { Link } from 'react-router-dom';

const AsideNavigation = ({ types }) => {
  return (
    <div className="aside-navigation catalogue-aside-navigation">
      <h2 className="aside-navigation__header">
        Види продукції
      </h2>
      <div className="aside-navigation__list list-dark">
        {types && types.map((type) => (
          <Link key={type.id} to={`/catalogue/${type.url}`} className="aside-navigation__link">{type.title}</Link>
        ))}
      </div>
      <a href="http://localhost:5000/download-catalogue" className="aside-navigation__download">
        Каталог
        <svg className="icon icon-download">
          <use href="images/icons/sprite.svg#download-popular"></use>
        </svg>
      </a>
    </div>
  )
}

export default AsideNavigation;