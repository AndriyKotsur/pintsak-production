import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Form, Input } from 'components'

const Step2 = () => {
	const dispatch = useDispatch()
	const currentStep = useSelector(state => state.addTile.step)

	const onSubmit = () => {
		dispatch(AddTileActions.changeStep(currentStep + 1))
		dispatch(AddTileActions.changeStep(currentStep - 1))
	}

	return (
		<Form
			title="Фізичні параметри"
			controllers
			handler={onSubmit}>
			<Input
				type='number'
				name='width'
				title='Ширина товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				isRequired />
			<Input
				type='number'
				name='height'
				title='Висота товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				isRequired />
			<Input
				type='number'
				name='thickness'
				title='Товщина товару'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				isRequired/>
			<Input
				type='number'
				name='weight_per_meter'
				title='Вага на метр кв.'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				isRequired />
			<Input
				type='number'
				name='pieces_per_meter'
				title='Кількість на метр кв.'
				onChange={e => dispatch(AddTileActions.handleChange(e, 'sizes'))}
				isRequired />
		</Form>
	)
}

export default Step2
