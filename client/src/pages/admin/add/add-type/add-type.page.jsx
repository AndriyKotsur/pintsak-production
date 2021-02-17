import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTypeActions from 'actions/add-type.action'
import {Form, Input} from 'components'

const AddType = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addType)

	const addType = async e => {
		e.preventDefault()
		dispatch(AddTypeActions.addType(state))
	}

	useEffect(() => {
		if(state.add_type_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_type_status])

	useEffect(() => {
		dispatch(AddTypeActions.clear())
	}, [])

	return (
		<Form
			title="Додати категорію"
			handler={addType}>
			<Input
				type='text'
				name='title'
				value={state.title}
				title='Назва категорії'
				onChange={e => dispatch(AddTypeActions.handleChange(e))}
				isRequired />
		</Form>
	)
}

export default AddType