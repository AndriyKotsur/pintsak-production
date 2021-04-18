import React from 'react'
import { Icon } from 'components'
import s from './style.module.scss'
import classNames from 'classnames'

const DropdownLanguage = () => {
	return (
		<div className={s.wrapper}>
			<Icon name="language" className={classNames('icon', 'icon-lang', s.icon)} />
			<span className={s.text}>Uk</span>
		</div>
	)
}

export default DropdownLanguage