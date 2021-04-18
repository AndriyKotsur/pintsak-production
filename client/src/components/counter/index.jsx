import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import * as CartActions from "actions/cart-action"

import { Icon } from "components"

import classNames from "classnames"
import s from "./style.module.scss"

const Counter = ({ id, type, quantity, handleQuantity }) => {
    const dispatch = useDispatch()

    const handleIncrease = () => {
        handleQuantity(quantity + 1)
        dispatch(CartActions.editCartItem(id, 'plus'))
    }

    const handleDecrease = () => {
        handleQuantity(quantity - 1)
        dispatch(CartActions.editCartItem(id, 'minus'))
    }

    return (
        <div className={classNames(s.wrapper, { [s.cart]: type === 'cart' , [s.catalogue]: type === 'catalogue' }) }>
            <button className={classNames(s.remove, { [s.disabled]: quantity <= 1 }) } onClick={handleDecrease} disabled={quantity <= 1}>
                <span className={s.minus}></span>
            </button>
            <div className={s.count}>{quantity ? quantity : 1}{ type === 'catalogue' && <span>м<sup>2</sup></span>}</div>
            <button className={s.add} onClick={handleIncrease}>
                <span className={s.plus}></span>
            </button>
            { type === 'catalogue' &&
                    <button className={s.button}>
                        <Icon name='cart' className='icon icon-cart'/>
                    </button> }
            { type === 'product' && <span className={s.size}>м<sup>2</sup></span> }
        </div>
    )
}

export default Counter