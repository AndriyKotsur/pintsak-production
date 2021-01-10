import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'
import { Input } from 'components'

const EditTile = () => {
	const history = useHistory()
	const { id } = useParams()
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)
	const [imagesPreview, setImagesPreview] = useState([])

	const updateTile = async e => {
		e.preventDefault()
		dispatch(EditTileActions.editTile(id, state))
	}

	const onImageChange = e => {
		let imageObj = []
		imageObj.push(e.target.files)
		let imageArr = []
		let imagePre = []
		for(let i = 0; i < imageObj[0].length; i++) {
			imagePre.push(URL.createObjectURL(imageObj[0][i]))
			imageArr.push(imageObj[0][i])
		}
		dispatch(EditTileActions.handleChange(imageArr))
		setImagesPreview(imagePre)
	}

	useEffect(() => {
		if(state.edit_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_tile_status])

	useEffect(() => {
		dispatch(EditTileActions.clear())
		dispatch(EditTileActions.getTile(id))
		dispatch(EditTileActions.getTileTypes())
	}, [id])

	return (
		<>
			{
				(state.get_tile_status === 'loading' || state.get_types_status === 'loading') && 'Loading...'
			}
			{ state.get_tile_status === 'success' && state.get_types_status && (
				<div className="contact-us">
					<div className="container">
						<div className="contact-us-inner">
							<h2 className="contact-us__title">
                Редагувати товар
							</h2>
							<form
								onSubmit={updateTile}
								className="form contact-us-form"
							>
								<div>
									<label>Попередні картинки</label>
									{state.imagesPreview.map(image => (
										<img key={state.imagesPreview.indexOf(image)} src={image} alt="Alt item"/>
									))}
								</div>
								<div className="input-field contact-us-field">
									<input
										type="file"
										name="images"
										onChange={onImageChange}
										className="input contact-us__input"
										multiple
									/>
									{imagesPreview.length > 0 && imagesPreview.map(image => (
										<img key={imagesPreview.indexOf(image)} src={image} alt="Alt item"/>
									))}
									<br />
									<label>Нові картинки</label>
								</div>
								<Input
									type='text'
									name='title'
									value={state.title}
									placeholder='Назва товару'
									onChange={e => dispatch(EditTileActions.handleChange(e))}
									isRequired/>
								<Input
									type='text'
									name='url'
									value={state.url}
									placeholder='Назва товару (aнгл)'
									onChange={e => dispatch(EditTileActions.handleChange(e))}
									isRequired/>
								<div>
									<select
										value={state.type}
										onChange={e => dispatch(EditTileActions.handleChange(e))}
										name="type"
										className="input contact-us__input"
										required
									>
										{state.types ? (
											state.types.map(type => (
												<option key={type.id} >{type.title}</option>
											))
										) : <option>Немає доданих категорій</option>
										}
									</select>
									<label>Категорія товару</label>
								</div>
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
								<div className="input-field contact-us-field">
									<input
										type="checkbox"
										name="is_popular"
										checked={state.is_popular ? true : false}
										onChange={e => dispatch(EditTileActions.handleChange(e))}
										className="input"
									/>
									<label className="label contact-us__label">Популярна</label>
								</div>
								<div className="input-field contact-us-field">
									<input
										type="checkbox"
										name="is_available"
										checked={state.is_available ? true : false}
										onChange={e => dispatch(EditTileActions.handleChange(e))}
										className="input"
									/>
									<label className="label contact-us__label">В наявності</label>
								</div>
								<p className="contact-us__required">обов’язкові поля</p>
								<button className="contact-us__btn">Пітвердити</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EditTile