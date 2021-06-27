import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Title, Input, Select } from 'components'

const Characteristics = () => {
	const dispatch = useDispatch()
  const state = useSelector(state => state.editTile)

  const measurement = [ { title: "Квадратний метр" }, { title: "Штука" } ]

	return (
		<Fragment>
			<Title value="Характеристики продукту" />
			<Select
				name="measurement"
				data={measurement}
        value={state.sizes.measurement}
				onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))} />
      <Input
        type='number'
        name='weight'
        title='Вага на метр кв.'
        value={state.sizes.weight}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        required />
      <Input
        type='number'
        name='quantity'
        title='Кількість на метр кв.'
        value={state.sizes.quantity}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        required />
      <Input
        type='number'
        name='width'
        title='Ширина товару'
        value={state.sizes.width}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        required />
      <Input
        type='number'
        name='height'
        title='Висота товару'
        value={state.sizes.height}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        required />
      <Input
        type='number'
        name='thickness'
        title='Товщина товару'
        value={state.sizes.thickness}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'sizes'))}
        required />
		</Fragment>
	)
}

export default Characteristics
