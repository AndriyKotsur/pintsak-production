import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import s from './style.module.scss'

const Title = ({ children, styleName }) => {
  return (
    <h1 className={classNames(s.title, styleName)}>
      {children}
    </h1>
  )
}

Title.propTypes = {
	styleName: PropTypes.string,
}

Title.defaultProps = {
	styleName: '',
}
export default Title