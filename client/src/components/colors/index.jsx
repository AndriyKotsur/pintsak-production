import React, { useState } from 'react'

import classNames from 'classnames'
import s from "./style.module.scss"

const Colors = ({ colors, handleVariant }) => {
  const [active, setActive] = useState(colors[0])

  const handleClick = (e) => {
    let value = e.currentTarget.dataset.color
  
    setActive(value)
    handleVariant(value)
  }

  return (
    <div className={s.colors}>
      <span className={s.colors_title}>Кольори</span>
      <div className={s.colors_wrapper}>
        { colors && colors.map((color, index) =>
        <div
          key={'color_'+ index}
          data-color={color}
          className={classNames(s.color, {[s.active]: color === active})}
          onClick={e => handleClick(e)}>
            <span
              style={{background: color}}
              className={s.color_item}></span>
        </div>) }
      </div>
    </div>
  )
}

export default Colors