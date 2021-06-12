import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Button = ({type, children, transparent, disabled, styleName, handleClick}) => {
  return(
    <button
      type={type}
      className={classNames(s.button, styleName, {[s.transparent]: transparent})}
      onClick={handleClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button