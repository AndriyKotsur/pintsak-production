import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Title, Input, Select, Checkbox, File } from 'components'

const Options = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	
	return (
		<Fragment>
			<Title value="Параметри продукту" />
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
		</Fragment>
	)
}

export default Options
