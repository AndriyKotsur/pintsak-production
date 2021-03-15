import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'
import { Preloader, Form, Input, Select, Checkbox, File } from 'components'

const EditTile = () => {
	const history = useHistory()
	const { url } = useParams()
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const updateTile = async e => {
		e.preventDefault()
		dispatch(EditTileActions.editTile(url, state))
	}

	useEffect(() => {
		if(state.edit_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_tile_status])

	useEffect(() => {
		dispatch(EditTileActions.getTile(url))
		dispatch(EditTileActions.getTileTypes())

		return () => dispatch(EditTileActions.clear())
	}, [url])

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
						value={state.sizes.width}
						placeholder='Ширина товару'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
						isRequired/>
					<Input
						type='number'
						name='height'
						value={state.sizes.height}
						placeholder='Висота товару'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
						isRequired/>
					<Input
						type='number'
						name='thickness'
						value={state.sizes.thickness}
						placeholder='Товщина товару'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
						isRequired/>
					<Input
						type='number'
						name='weight_per_meter'
						value={state.sizes.weight_per_meter}
						placeholder='Вага на метр кв.'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
						isRequired/>
					<Input
						type='number'
						name='pieces_per_meter'
						value={state.sizes.pieces_per_meter}
						placeholder='Кількість на метр кв.'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
						isRequired/>
					<Input
						type='number'
						name='grey'
						value={state.prices.grey}
						placeholder='Ціна сірої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}
						isRequired/>
					<Input
						type='number'
						name='yellow'
						value={state.prices.yellow}
						placeholder='Ціна жовтої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
					<Input
						type='number'
						name='orange'
						value={state.prices.orange}
						placeholder='Ціна помаранчевої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
					<Input
						type='number'
						name='red'
						value={state.prices.red}
						placeholder='Ціна червоної продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
					<Input
						type='number'
						name='brown'
						value={state.prices.brown}
						placeholder='Ціна коричневої продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
					<Input
						type='number'
						name='black'
						value={state.prices.black}
						placeholder='Ціна чорної продукції'
						onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
				</Form>
			)}
		</>
	)
}

export default EditTile