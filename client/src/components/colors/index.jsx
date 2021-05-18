import React, { useState } from 'react'

import { Input } from 'components'

const ColorsAndPrices = ({ colors, onChange }) => {
	const [color, setColor] = useState('grey')
	const [price, setPrice] = useState(10)

	const onAddColor = () => {
		if (color.length > 0 && price) {
			onChange('add', color, price)
			setColor('grey')
			setPrice(10)
		}
	}

	return (
		<>
			{
				Object.keys(colors) && Object.keys(colors).length > 0 && Object.entries(colors).map(([key, value], idx) => (
					<div key={idx}>
						<input className='input' value={key} disabled />
						<input className='input' value={value} disabled />
						<button
							type="button"
							onClick={() => onChange('remove', key)}>
							Видалити
						</button>
					</div>
				))
			}
			<Input
				type='text'
				name='color'
				title='Колір товару'
				onChange={e => setColor(e.target.value)}
				isRequired />
			<Input
				type='number'
				name='price'
				title='Ціна товару'
				onChange={e => setPrice(Number(e.target.value))}
				isRequired />
			<button type="button" onClick={onAddColor}>
				Додати
			</button>
		</>
	)
}

export default ColorsAndPrices