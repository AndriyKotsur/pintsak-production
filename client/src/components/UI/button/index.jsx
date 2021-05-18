import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Button = ({type, children, disabled, styleName, handleClick}) => {
  return(
    <button
      type={type}
      className={classNames(s.button, styleName)}
      onClick={handleClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button