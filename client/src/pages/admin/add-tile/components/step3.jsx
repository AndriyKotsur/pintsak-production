import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import { Form, Input } from 'components'

const Step3 = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	const currentStep = useSelector(state => state.addTile.step)

	const addTile = async e => {
		e.preventDefault()
		dispatch(AddTileActions.addTile(state))
	}

	const onSubmit = () => {
		dispatch(AddTileActions.changeStep(currentStep + 1))
	}

	return (
		<Form
			title="Цінові параметри"
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

export default Step3
