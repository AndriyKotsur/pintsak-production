import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'
import { Preloader, Form, Input, Select, Checkbox, File } from 'components'

const EditTile = () => {
	const history = useHistory()
	const { id } = useParams()
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const updateTile = async e => {
		e.preventDefault()
		dispatch(EditTileActions.editTile(id, state))
	}

	useEffect(() => {
		if(state.edit_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_tile_status])

	useEffect(() => {
		dispatch(EditTileActions.getTile(id))
		dispatch(EditTileActions.getTileTypes())

		return () => dispatch(EditTileActions.clear())
	}, [id])

	return (
		<>
			{
				(state.get_tile_status === 'loading' || state.get_types_status === 'loading') && <Preloader />
			}
			{ state.get_tile_status === 'success' && state.get_types_status && (
				<Form
					title="Редагувати товар"
					handler={updateTile}>
					<File
						name={'images'}
						label={'Редагувати галерею товару'}
						previous={state.imagesPreview}
						onChange={image => dispatch(EditTileActions.handleChange(image))} />
					<Input
						type='text'
						name='title'
						value={state.title}
						placeholder='Назва товару'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Select
						name='type'
						value={state.type}
						data={state.types}
						onChange={e => dispatch(EditTileActions.handleChange(e))} />
					<Checkbox
						name='is_popular'
						label='Чи продукт популярний?'
						checked={state.is_available}
						onChange={e => dispatch(EditTileActions.handleChange(e))} />
					<Checkbox
						name='is_available'
						label='Чи продукт в наявності?'
						checked={state.is_popular}
						onChange={e => dispatch(EditTileActions.handleChange(e))} />
					<Input
						type='number'
						name='width'
						value={state.width}
						placeholder='Ширина товару'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='height'
						value={state.height}
						placeholder='Висота товару'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='thickness'
						value={state.thickness}
						placeholder='Товщина товару'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='weight_per_meter'
						value={state.weight_per_meter}
						placeholder='Вага на метр кв.'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='pieces_per_meter'
						value={state.pieces_per_meter}
						placeholder='Кількість на метр кв.'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='grey'
						value={state.grey}
						placeholder='Ціна сірої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}
						isRequired/>
					<Input
						type='number'
						name='yellow'
						value={state.yellow}
						placeholder='Ціна жовтої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}/>
					<Input
						type='number'
						name='orange'
						value={state.orange}
						placeholder='Ціна помаранчевої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}/>
					<Input
						type='number'
						name='red'
						value={state.red}
						placeholder='Ціна червоної продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}/>
					<Input
						type='number'
						name='brown'
						value={state.brown}
						placeholder='Ціна коричневої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}/>
					<Input
						type='number'
						name='black'
						value={state.black}
						placeholder='Ціна чорної продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e))}/>
				</Form>
			)}
		</>
	)
}

export default EditTile