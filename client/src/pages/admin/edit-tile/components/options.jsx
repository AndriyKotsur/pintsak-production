import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Title, Input, Select, Checkbox, File } from 'components'

import s from '../style.module.scss'

const Options = ({ formikProps }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.editTile)

  const { errors, values, touched, setFieldValue } = formikProps

  return (
    <Fragment>
      <Title styleName={s.steps_title}>
        Параметри продукту
      </Title>
      <File
        id={state._id}
        validFiles={values.images}
        previewFiles={state.imagesPreview}
        error={errors.images && touched.images}
				errorName={errors.images || ''}
        handleChange={image => {
          dispatch(EditTileActions.handleChange(image))
          setFieldValue('images', image)
        }}
        handleDelete={(image, id) => dispatch(EditTileActions.handleDelete(image, id))} />
      <Input
        type='text'
        name='title'
        value={values.title}
        error={errors.title && touched.title}
        errorName={errors.title || ''}
        placeholder='Назва товару'
        onChange={e => {
          dispatch(EditTileActions.handleChange(e))
          setFieldValue('title', e.target.value)
        }} />
      <Select
        name='type'
        value={state.type}
        data={state.types}
        onChange={e => {
          dispatch(EditTileActions.handleChange(e))
        }} />
      <div className={s.steps_group}>
        <Checkbox
          name='is_available'
          label='Товар в наявності?'
          checked={state.is_available}
          onChange={e => {
            dispatch(EditTileActions.handleChange(e))
          }} />
        <Checkbox
          name='is_popular'
          label='Популярний товар?'
          checked={state.is_popular}
          onChange={e => {
            dispatch(EditTileActions.handleChange(e))
          }} />
      </div>
    </Fragment>
  )
}

export default Options
