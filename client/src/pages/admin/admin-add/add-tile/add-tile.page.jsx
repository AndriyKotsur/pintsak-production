import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import Input from 'components/input/input.component'

const AddTile = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	const [imagesPreview, setImagesPreview] = useState([])

	const addTile = async e => {
		e.preventDefault()
		dispatch(AddTileActions.addTile(state))
	}

	const onImageChange = e => {
		let imageArr = []
		let imagePre = []
		for(let i = 0; i < e.target.files.length; i++) {
			imagePre.push(URL.createObjectURL(e.target.files[i]))
			imageArr.push(e.target.files[i])
		}
		dispatch(AddTileActions.handleChange(imageArr))
		setImagesPreview(imagePre)
	}

	useEffect(() => {
		if(state.add_tile_status === 'success')
			history.push('/admin/main/tile')
	}, [state.add_tile_status])

	useEffect(() => {
		dispatch(AddTileActions.clear())
		dispatch(AddTileActions.getTileTypes())
	}, [])

	return (
		<>
			<div className="contact-us">
				<div className="container">
					<div className="contact-us-inner">
						<h2 className="contact-us__title">
              Додати товар
						</h2>
						<form onSubmit={e => addTile(e)} className="form contact-us-form">
							<div className="input-field contact-us-field">
								<input type="file" name="images" onChange={e => onImageChange(e)} className="input contact-us__input" multiple/>
								{imagesPreview.length > 0 && imagesPreview.map(image => (
									<img key={imagesPreview.indexOf(image)} src={image} alt="Alt item"/>
								))}
								<label>Картинка товару</label>
							</div>
							<Input name={'title'} title={'Назва товару'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'url'} title={'Назва товару (aнгл)'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<div>
								<select name="type" defaultValue={state.type} onChange={e => dispatch(AddTileActions.handleChange(e))} className="input contact-us__input" required>
									{state.types ? state.types.map(type => (
										<option key={type.id}>{type.title}</option>
									))
										: <option>Немає доданих категорій</option>
									}
								</select>
								<label>Категорія товару</label>
							</div>
							<Input name={'width'} title={'Ширина товару'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'height'} title={'Висота товару'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'thickness'} title={'Товщина товару'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'weight_per_meter'} title={'Вага на метр кв.'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'pieces_per_meter'} title={'Кількість на метр кв.'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'grey'} title={'Ціна сірої'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'orange'} title={'Ціна оранжевої'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'red'} title={'Ціна червоної'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'brown'} title={'Ціна коричневої'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Input name={'black'} title={'Ціна чорної'} onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<div className="input-field contact-us-field">
								<input type="checkbox" name="is_popular" onChange={e => dispatch(AddTileActions.handleChange(e))} className="input" />
								<label className="label contact-us__label">Популярна</label>
							</div>
							<div className="input-field contact-us-field">
								<input type="checkbox" name="is_available" onChange={e => dispatch(AddTileActions.handleChange(e))} className="input" />
								<label className="label contact-us__label">В наявності</label>
							</div>
							<p className="contact-us__required">обов’язкові поля *</p>
							<button className="contact-us__btn">Пітвердити</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddTile
