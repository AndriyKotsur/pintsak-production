import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import * as CartActions from 'actions/cart-action'

import {Icon, Cart} from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const DropdownCart = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const cart = useSelector(cart => cart.cart)

    useEffect(() => {
        dispatch(CartActions.getCartItems())
    }, [])

    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className={s.wrapper}>
            <Icon name="shopping" className={classNames('icon', 'icon-cart', s.icon)}/>
            <span className={s.count}>({cart.items.length})</span>
            <div className={classNames(s.cart, { [s.visible]: visible && !cart.is_active })}>
                {
                    cart.items.length > 0 ?
                        <div className={s.container}>
                            <h3 className={s.title}>В кошику {cart.items.length} товар на суму:</h3>
                            <p className={s.price}>{cart.subtotal},<sup>00</sup> грн</p>
                            <Link to="/order" className={s.btn}>Замовити</Link>
                            <button
                                type="button"
                                onClick={() => dispatch(CartActions.handleCart(true))}
                                className={s.link}>Перейти в кошик
                                <Icon name="arrow" className={classNames('icon', 'icon-arrow', s.arrow)}/>
                            </button>
                        </div>
                        :
                        <div className={s.container}>
                            <h3 className={s.title}>Немає продуктів в корзині</h3>
                        </div>
                }
            </div>
            { cart.is_active && <Cart /> }
        </div>
    )
}

export default DropdownCart