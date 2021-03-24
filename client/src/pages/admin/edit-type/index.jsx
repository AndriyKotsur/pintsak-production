import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTypeActions from 'actions/edit-type.action'
import { Input, Form } from 'components'

const EditType = () => {
	const history = useHistory()
	const { id } = useParams()
	const dispatch = useDispatch()
	const state = useSelector(state => state.editType)

	const updateType = async e => {
		e.preventDefault()
		dispatch(EditTypeActions.editType(id, state))
	}

	useEffect(() => {
		if(state.edit_type_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_type_status])

	useEffect(() => {
		dispatch(EditTypeActions.getType(id))
		return () =>  dispatch(EditTypeActions.clear())
	}, [id])

	return (
		<>
			{
				state.get_type_status === 'loading' && 'Loading...'
			}
			{
				state.get_type_status === 'success' && (
					<Form
						title="Редагувати категорію"
						handler={updateType}>
						<Input
							type='text'
							name='title'
							value={state.title}
							placeholder='Назва категорії'
							onChange={e => dispatch(EditTypeActions.handleChange(e))}
							isRequired />
					</Form>
				)
			}
		</>
	)
}

export default EditType