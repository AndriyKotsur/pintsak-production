import React from 'react'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const DropdownLanguage = () => {
	return (
		<div className={s.language_wrapper}>
			<Icon name='language' className={classNames('icon', 'icon-lang', s.language_icon)} />
			<span className={s.language_text}>
				Uk
			</span>
		</div>
	)
}

export default DropdownLanguage