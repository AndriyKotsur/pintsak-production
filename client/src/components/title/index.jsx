import React from 'react'

import classNames from 'classnames'
import s from './style.module.scss'

const Title = ({ children, styleName }) => {
  return (
    <h1 className={classNames(s.title, styleName)}>
      {children}
    </h1>
  )
}

export default Title