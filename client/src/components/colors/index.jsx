import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Input } from 'components'

import s from './style.module.scss'

const Colors = ({ colors, onChange }) => {
	const [color, setColor] = useState('')
	const [price, setPrice] = useState(null)

	const keys = Object.keys(colors)
	const entries = Object.entries(colors)

	const handleColor = () => {
		if (color.length > 0 && price) {
			onChange('add', color, price)
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
						onChange={e => setColor(e.target.value)}
						disabled />
					<Input
						type='text'
						name='color'
						value={value}
						styleName={s.colors_field}
						placeholder='Колір товару'
						onChange={e => setColor(e.target.value)}
						disabled />
					<Button
						type="button"
						transparent
						styleName={s.colors_button}
						handleClick={() => onChange('remove', key)}>
						<span className={s.colors_remove}></span>
					</Button>
				</div>
			))}
			<div className={s.colors_fields}>
				<Input
					type='text'
					name='color'
					placeholder='Колір товару'
					styleName={s.colors_field}
					onChange={e => setColor(e.target.value)} />
				<Input
					type='number'
					name='price'
					placeholder='Ціна товару'
					styleName={s.colors_field}
					onChange={e => setPrice(Number(e.target.value))} />
				<Button
					type="button"
					transparent
					styleName={s.colors_button}
					handleClick={handleColor}>
					<span className={s.colors_add}></span>
				</Button>
			</div>
		</div>
	)
}

Colors.propTypes = {
	colors: PropTypes.any,
  onChange: PropTypes.func
}

Colors.defaultProps = {
	colors: {},
  onChange: () => null
}
export default Colors