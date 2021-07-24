import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components'

import s from './style.module.scss'

const Form = ({
	children,
	required,
	handler,
}) => {
	return (
	<form onSubmit={handler} className={s.form}>
		{children}
		{ required && <span className={s.required}>обов’язкові поля</span> }
		<Button
			type="submit"
			background="orange"
			styleName={s.btn}>
				Пітвердити
		</Button>
	</form>
	)
}

Form.propTypes = {
	required: PropTypes.bool,
  handler: PropTypes.func
}

Form.defaultProps = {
	required: false,
  handler: () => null
}
export default Form
