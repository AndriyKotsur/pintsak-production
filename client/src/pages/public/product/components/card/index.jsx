import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as CartActions from 'actions/cart-action'

import { Icon, Counter } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Card = ({tile, cart}) => {
  const [quantity, setQuantity] = useState(1)
	const [variant, setVariant] = useState('grey')
  
  const dispatch = useDispatch()
	const { url } = useParams()

  const itemInCart = cart.items.find(item => item.url === url)

  const handleVariant = (e) => {
    let value = e.currentTarget.dataset.color
    setVariant(value)
  }

	const handleCart = () => {
    if(!itemInCart) dispatch(CartActions.addCartItem(tile, quantity, variant))
		dispatch(CartActions.handleCart(true))
	}

  return (
    <div className={s.card}>
      <div className={s.card_wrapper}>
        <h1 className={s.card_title}>{tile.title}</h1>
        <p className={s.card_price}>{tile.prices[variant]},<sup> 00 грн</sup></p>
        { !itemInCart &&
            <Counter
            type="card"
            id={tile._id}
            quantity={itemInCart ? itemInCart.quantity : quantity}
            handleQuantity={!itemInCart && setQuantity} /> }
        { !itemInCart &&
            <div className={s.colors}>
              <span className={s.colors_title}>Кольори</span>
              <div className={s.colors_wrapper}>
                { Object.keys(tile.prices) && Object.keys(tile.prices).map((color, index) =>
                <div
                  key={'color_'+ index}
                  data-color={color}
                  className={classNames(s.color, {[s.active]: color === variant})}
                  onClick={e => handleVariant(e)}>
                    <span style={{background: color}} className={s.color_item}></span>
                </div>) }
              </div>
            </div>}
        <button
          onClick={handleCart}
          className={classNames('btn-green', 'btn-cart', s.card_btn, {[s.added]: itemInCart, [s.disabled]: !tile.is_available })}
          disabled={!tile.is_available}>
            <Icon name='cart' className={classNames('icon', 'icon-cart', s.card_icon)}/>
          В кошик
        </button>
      </div>
    </div>
  )
}

export default Card