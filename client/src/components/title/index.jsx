import React from 'react'

import s from './style.module.scss'

const Title = ({ value }) => {
  return (
    <h1 className={s.title}>{value}</h1>
  )
}

export default Title