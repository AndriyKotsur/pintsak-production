import React from 'react'
import { useHistory } from 'react-router'

import { Background, Button, Icon, Title } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const ErrorPage = () => {
	const history = useHistory()

	return (
		<section className={s.error}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }}/>
			<div className={s.error_wrapper}>
			<div className="container">
				<div className={s.error_container}>
					<Title styleName={s.error_title}>
						404
					</Title>
					<p className={s.error_text}>
						Сторінка, яку ви шукаєте більше не існує.
					</p>
					<Button
						type="button"
						background="transparent"
						styleName={s.error_button}
						handleClick={history.goBack}>
						<div className={s.button_container}>
							<Icon name='arrow' className={classNames('icon', 'icon-arrow', s.button_icon)} />
						</div>
						<span className={s.button_title}>
							Повернутися назад
						</span>
					</Button>
				</div>
			</div>
			</div>
		</section>
	)
}

export default ErrorPage