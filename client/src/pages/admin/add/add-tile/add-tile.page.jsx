import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import { Input, Select, Checkbox } from 'components'

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
			history.push('/admin/dashboard')
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
							<Input
								type='text'
								name='title'
								title='Назва товару'
								onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Input
								type='text'
								name='url'
								title='Назва товару (aнгл)'
								onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Select
								name='type'
								value={state.type}
								data={state.types}
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
							<Checkbox
								name='is_popular'
								label='Популярна'
								onChange={e => dispatch(AddTileActions.handleChange(e))} />
							<Checkbox
								name='is_available'
								label='В наявності'
								onChange={e => dispatch(AddTileActions.handleChange(e))} />
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
