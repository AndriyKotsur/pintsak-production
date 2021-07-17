import React from 'react'
import useCopyToClipboard from 'hooks/useCopyToClipboard'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const DropdownClipboard = () => {
	const [isCopied, handleCopy] = useCopyToClipboard(3000)
	const copyText = '+380995125826'

	return (
		<div className={s.clipboard_wrapper} onClick={() => handleCopy(copyText)}>
			<Icon name='phone' className={classNames('icon', 'icon-phone')} />
			<span className={s.clipboard_title}>
				+380995125826
			</span>
			<div className={s.clipboard_container}>
				<span className={s.clipboard_text}>
					{isCopied ? 'Скопійовано' : 'Натисніть ще раз, щоб скопіювати в буфер обміну'}
				</span>
			</div>
		</div>
	)
}

export default DropdownClipboard