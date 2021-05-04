import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Title, Input } from 'components'

const Characteristics = () => {
	const dispatch = useDispatch()
  const state = useSelector(state => state.editTile)

	return (
		<Fragment>
			<Title value="Характеристики продукту" />
      <Input
        type='number'
        name='width'
        title='Ширина товару'
        value={state.sizes.width}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        isRequired />
      <Input
        type='number'
        name='height'
        title='Висота товару'
        value={state.sizes.height}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        isRequired />
      <Input
        type='number'
        name='thickness'
        title='Товщина товару'
        value={state.sizes.thickness}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        isRequired />
      <Input
        type='number'
        name='weight_per_meter'
        title='Вага на метр кв.'
        value={state.sizes.weight_per_meter}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        isRequired />
      <Input
        type='number'
        name='pieces_per_meter'
        title='Кількість на метр кв.'
        value={state.sizes.pieces_per_meter}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        isRequired />
		</Fragment>
	)
}

export default Characteristics
