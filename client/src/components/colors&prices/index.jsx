import React, { useState } from 'react'

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
							Rem
						</button>
					</div>
				))
			}
			<input className='input' value={color} onChange={e => setColor(e.target.value)} required />
			<input className='input' type='number' value={price} onChange={e => setPrice(+e.target.value)} required />
			<button type="button" onClick={onAddColor}>
				Add
			</button>
		</>
	)
}

export default ColorsAndPrices