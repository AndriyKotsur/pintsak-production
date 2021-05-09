import React from 'react'
import useCopyToClipboard from 'hooks/useCopyToClipboard'

import { Icon } from 'components'

import s from './style.module.scss'
import classNames from 'classnames'

const DropdownClipboard = () => {
	const copyText = '+380636666666'
	const [isCopied, handleCopy] = useCopyToClipboard(3000)

	return (
		<div className={s.wrapper} onClick={() => handleCopy(copyText)}>
			<Icon name="phone" className={classNames('icon', 'icon-phone')} />
			<span className={s.title}>+380636666666</span>
			<div className={s.clipboard}>
				<span className={s.text}>{isCopied ? 'Скопійовано' : 'Натисніть ще раз, щоб скопіювати в буфер обміну'}</span>
			</div>
		</div>
	)
}

export default DropdownClipboard