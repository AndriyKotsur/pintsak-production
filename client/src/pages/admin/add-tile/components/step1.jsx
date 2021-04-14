import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Form, Input, Select, Checkbox, File } from 'components'

const Step1 = () => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	const currentStep = useSelector(state => state.addTile.step)

  const onSubmit = () => {
    dispatch(AddTileActions.changeStep(currentStep + 1))
  }

  return (
    <Fragment>
      <Form
      title="Основні характеристики"
      handler={onSubmit}>
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
      <button type="submit">Continue</button>
      </Form>
    </Fragment>

  )
}

export default Step1