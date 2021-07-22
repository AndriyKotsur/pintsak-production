import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTypeActions from 'actions/add-type.action'

import { Background, Form, Input, Title } from 'components'

import s from './style.module.scss'

const AddType = () => {
	const history = useHistory()

	const dispatch = useDispatch()
	const state = useSelector(state => state.addType)

	const handleAddType = async e => {
		e.preventDefault()
		dispatch(AddTypeActions.addType(state))
	}

	useEffect(() => {
		if (state.add_type_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_type_status, history])

	useEffect(() => {
		return () => dispatch(AddTypeActions.clear())
	}, [dispatch])

	return (
		<section className={s.type}>
			<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
			<div className="container">
				<div className={s.type_wrapper}>
					<Title styleName={s.type_title}>
						Додати категорію
					</Title>
					<Form
						handler={handleAddType}>
						<Input
							type='text'
							name='title'
							title='Назва категорії'
							value={state.title}
							onChange={e => dispatch(AddTypeActions.handleChange(e))}
							required />
					</Form>
				</div>
			</div>
		</section>
	)
}

export default AddType
