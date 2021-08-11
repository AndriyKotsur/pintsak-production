import React from 'react'
import PropTypes from 'prop-types'

import { Button, Input } from 'components'

import s from './style.module.scss'

const Colors = ({
	values,
	error,
	errorName,
	colors,
	onChange,
	onReset,
	onSubmit
}) => {
	const { color, price } = values

	const keys = Object.keys(colors)
	const entries = Object.entries(colors)

	const handleClear = () => {
		onChange('color', '')
		onChange('price', '')
	}

	const handleColor = () => {
		if (color && price) {
			onSubmit('add', color, price)
			
			handleClear()
			onReset()
		}
	}

	return (
		<div className={s.colors}>
			{keys && keys.length > 0 && entries.map(([key, value], index) => (
				<div key={index} className={s.colors_fields}>
					<Input
						type='text'
						name='color'
						value={key}
						styleName={s.colors_field}
						placeholder='Колір товару'
						disabled />
					<Input
						type='text'
						name='color'
						value={value}
						styleName={s.colors_field}
						placeholder='Колір товару'
						disabled />
					<Button
						type="button"
						transparent
						styleName={s.colors_button}
						handleClick={() => onSubmit('remove', key)}>
						<span className={s.colors_remove} />
					</Button>
				</div>
			))}
			<div className={s.colors_fields}>
				<Input
					type='text'
					name='color'
					value={color}
					error={error}
					errorName={errorName.color}
					placeholder='Колір товару'
					styleName={s.colors_field}
					onChange={e => onChange('color', e.target.value)} />
				<Input
					type='number'
					name='price'
					value={price}
					error={error}
					errorName={errorName.price}
					placeholder='Ціна товару'
					styleName={s.colors_field}
					onChange={e => onChange('price', Number(e.target.value))} />
				<Button
					type="button"
					transparent
					styleName={s.colors_button}
					handleClick={handleColor}>
					<span className={s.colors_add} />
				</Button>
			</div>
		</div>
	)
}

Colors.propTypes = {
	error: PropTypes.any,
	errorName: PropTypes.any,
	colors: PropTypes.any,
	values: PropTypes.any,
	onChange: PropTypes.func,
	onReset: PropTypes.func,
	onSubmit: PropTypes.func
}

Colors.defaultProps = {
	error: false,
	errorName: {},
	colors: {},
	values: {
		color: '',
		price: ''
	},
	onChange: () => null,
	onReset: () => null,
	onSubmit: () => null
}
export default Colors