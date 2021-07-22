import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as CartActions from 'actions/cart.action'

import { Button, Counter, Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Card = ({ cart, tile }) => {
  const defaultVariant =  Object.keys(tile.prices)[0]

  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(tile ? defaultVariant : 'grey')

  const dispatch = useDispatch()
  const { url } = useParams()

  const itemInCart = cart.items.find(item => item.url === url)

  let cartButtonClasses = {
    [s.added]: itemInCart,
    [s.disabled]: !tile.is_available
  }

  const handleSelectVariant = (e) => {
    let value = e.currentTarget.dataset.color
    setVariant(value)
  }

  const handleAddToCart = () => {
    if (!itemInCart) dispatch(CartActions.addCartItem(tile, quantity, variant))
    dispatch(CartActions.handleCart(true))
  }

  return (
    <div className={s.card}>
      <div className={s.card_wrapper}>
        <h1 className={s.card_title}>
          {tile.title}
        </h1>
        <p className={s.card_price}>
          {tile.prices[variant]},<sup> 00 грн</sup>
        </p>
        {!itemInCart &&
          <Counter
            type='product'
            id={tile._id}
            measurement={tile.sizes.measurement}
            quantity={itemInCart ? itemInCart.quantity : quantity}
            handleQuantity={!itemInCart && setQuantity} />}
        {!itemInCart &&
          <div className={s.colors}>
            <span className={s.colors_title}>
              Кольори
            </span>
            <div className={s.colors_wrapper}>
              {Object.keys(tile.prices) && Object.keys(tile.prices).map((color, index) =>
                <div
                  key={'color_' + index}
                  data-color={color}
                  className={classNames(s.color, { [s.active]: color === variant })}
                  onClick={e => handleSelectVariant(e)}>
                  <span style={{ background: color }} className={s.color_item}></span>
                </div>)}
            </div>
          </div>}
        <Button
          type='button'
          background="green"
          disabled={!tile.is_available}
          styleName={classNames(s.card_btn, cartButtonClasses)}
          handleClick={handleAddToCart}>
          <Icon name='cart' className={classNames('icon', 'icon-cart', s.card_icon)} />
          В кошик
        </Button>
      </div>
    </div>
  )
}

Card.propTypes = {
  cart: PropTypes.object,
	tile: PropTypes.object
}

Card.defaultProps = {
	cart: {},
	tile: {}
}
export default Card