import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Title, Input, ColorsAndPrices } from 'components'
import { ColorsBuilder } from 'helpers'

const Prices = () => {
	const dispatch = useDispatch()
  const state = useSelector(state => state.editTile)
  
	const onChange = (type, name, event) => {
		const prices = ColorsBuilder(state.prices, type, name, event)
		dispatch(EditTileActions.handleChangeColor(prices))
	}

	return (
		<Fragment>
			<Title value="Ціна продукту" />
			<ColorsAndPrices colors={state.prices} onChange={onChange} />
      {/* <Input
        type='number'
        name='grey'
        title='Ціна сірої продукції'
        value={state.prices.grey}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}
        isRequired/>
      <Input
        type='number'
        name='yellow'
        title='Ціна жовтої продукції'
        value={state.prices.yellow}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
      <Input
        type='number'
        name='orange'
        title='Ціна помаранчевої продукції'
        value={state.prices.orange}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
      <Input
        type='number'
        name='red'
        title='Ціна червоної продукції'
        value={state.prices.red}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
      <Input
        type='number'
        name='brown'
        title='Ціна коричневої продукції'
        value={state.prices.brown}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/>
      <Input
        type='number'
        name='black'
        title='Ціна чорної продукції'
        value={state.prices.black}
        onChange={e => dispatch(EditTileActions.handleChange(e, 'prices'))}/> */}
		</Fragment>
	)
}

export default Prices