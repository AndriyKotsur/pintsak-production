import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Button = ({
  background,
  children,
  disabled,
  styleName,
  type,
  handleClick
}) => {
  let classes = {
    [s.button_green]: background === 'green',
    [s.button_orange]: background === 'orange',
    [s.button_transparent]: background === 'transparent',
    [s.button_disabled]: disabled
  }
  return (
    <button
      type={type}
      className={classNames(s.button, classes, styleName)}
      onClick={handleClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
	background: PropTypes.string,
	disabled: PropTypes.bool,
  styleName: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func
}

Button.defaultProps = {
	background: '',
	disabled: false,
  styleName: '',
  type: '',
  handleClick: () => null
}
export default Button