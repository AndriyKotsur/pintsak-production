import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import * as CartActions from 'actions/cart-action'

import {Icon, Counter} from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(cart => cart.cart)

    useEffect(() => {
        dispatch(CartActions.getCartItems())
    }, [])

    useEffect(() => {
        cart.is_active && document.body.classList.add(s.hidden)
        !cart.is_active && document.body.classList.remove(s.hidden)
    }, [cart.is_active])

    return (
        <Fragment>
            {
                cart.is_active &&
                <div className={s.section}>
                    <div className={s.wrapper}>
                        <div className={s.head}>
                            <h2 className={s.head_title}>Товари в кошику</h2>
                            <button type="button" onClick={() => dispatch(CartActions.handleCart(false))}
                                    className={s.head_close}>
                                <Icon name="close" className="icon icon-close--big"/>
                            </button>
                        </div>
                        <div className={s.description}>
                            <span className={s.description_item}>Кількість, м<sup>2</sup></span>
                            <span className={s.description_item}>Ціна, грн</span>
                            <span className={s.description_item}>Сума, грн</span>
                        </div>
                        <div className={s.list}>
                            {
                                cart.items.length > 0 && cart.items.map((item, index) => (
                                    <div key={index} className={s.item}>
                                        <div className={s.item_wrapper}>
                                            <button type="button"
                                                    onClick={() => dispatch(CartActions.deleteCartItem(item._id))}
                                                    className={s.item_close}>
                                                <Icon name="close" className="icon icon-close--small"/>
                                            </button>
                                            <picture className={s.item_image}>
                                                <img src={item.image} alt={item.title}/>
                                            </picture>
                                            <div className={s.item_text}>
                                                <Link to={`/${item.type.url}`}
                                                      className={s.item_type}>{item.type.title}</Link>
                                                <Link to={`/${item.type.url}/${item.url}`}
                                                      className={s.item_title}>{item.title}</Link>
                                            </div>
                                        </div>
                                        <div className={s.item_total}>
                                            <Counter type="cart" quantity={item.quantity} />
                                            <div className={s.item_coast}>
                                                <span className={s.item_price}>{item.price},<sup>00</sup></span>
                                                <span className={s.item_summary}>{item.price * item.quantity},<sup>00</sup></span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={s.order}>
                            <div className={s.back} onClick={() => dispatch(CartActions.handleCart(false))}>
                                <span className={s.back_text}>Продовжити покупки</span>
                                <button className={s.back_btn}>
                                    <Icon name="arrow" className={classNames('icon', 'icon-arrow', s.back_icon)}/>
                                </button>
                            </div>
                            <div className={s.total}>
                                <div className={s.coast}>
                                    <span className={s.total}>Підсумок</span>
                                    <span className={s.summary}>{cart.subtotal},<sup>00 грн</sup></span>
                                </div>
                                <Link to="/order"  className={s.btn}>Замовити</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Cart