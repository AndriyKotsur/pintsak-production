import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import { Form, Input, Select, Checkbox, File } from 'components'

const AddTile = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const addTile = async e => {
		e.preventDefault()
		dispatch(AddTileActions.addTile(state))
	}

	useEffect(() => {
		if(state.add_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_tile_status])

	useEffect(() => {
		dispatch(AddTileActions.clear())
		dispatch(AddTileActions.getTileTypes())
	}, [])

	return (
		<>
			<Form
				title="Додати товар"
				handler={addTile}>
				<File
					name={'images'}
					label={'Додати галерею товару'}
					onChange={image => dispatch(AddTileActions.handleChange(image))} />
				<Input
					type='text'
					name='title'
					title='Назва товару'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Select
					name='type'
					value={state.type}
					data={state.types}
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Checkbox
					name='is_popular'
					label='Чи продукт популярний?'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Checkbox
					name='is_available'
					label='Чи продукт в наявності?'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Input
					type='number'
					name='width'
					title='Ширина товару'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Input
					type='number'
					name='height'
					title='Висота товару'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Input
					type='number'
					name='thickness'
					title='Товщина товару'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired/>
				<Input
					type='number'
					name='weight_per_meter'
					title='Вага на метр кв.'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Input
					type='number'
					name='pieces_per_meter'
					title='Кількість на метр кв.'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Input
					type='number'
					name='grey'
					title='Ціна сірої'
					onChange={e => dispatch(AddTileActions.handleChange(e))}
					isRequired />
				<Input
					type='number'
					name='orange'
					title='Ціна оранжевої'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Input
					type='number'
					name='red'
					title='Ціна червоної'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Input
					type='number'
					name='brown'
					title='Ціна коричневої'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
				<Input
					type='number'
					name='black'
					title='Ціна чорної'
					onChange={e => dispatch(AddTileActions.handleChange(e))} />
			</Form>
		</>
	)
}

export default AddTile
