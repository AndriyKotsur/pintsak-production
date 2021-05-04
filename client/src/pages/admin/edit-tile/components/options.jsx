import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Title, Input, Select, Checkbox, File } from 'components'

const Options = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)
	
	return (
		<Fragment>
			<Title value="Параметри продукту" />
      <File onChange={image => dispatch(EditTileActions.handleChange(image))} />
      <Input
        type='text'
        name='title'
        title='Назва товару'
        value={state.title}
        onChange={e => dispatch(EditTileActions.handleChange(e))}
        isRequired />
      <Select
        name='type'
        value={state.type}
        data={state.types}
        onChange={e => dispatch(EditTileActions.handleChange(e))} />
      <Checkbox
        name='is_popular'
        label='Чи продукт популярний?'
        checked={state.is_popular}
        onChange={e => dispatch(EditTileActions.handleChange(e))} />
      <Checkbox
        name='is_available'
        label='Чи продукт в наявності?'
        checked={state.is_available}
        onChange={e => dispatch(EditTileActions.handleChange(e))} />
		</Fragment>
	)
}

export default Options
