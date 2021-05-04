import React, { Fragment, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTypeActions from 'actions/edit-type.action'

import { Background, Preloader, Title, Input, Form } from 'components'

import s from './style.module.scss'

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
		<Fragment>
			{ state.get_type_status === 'loading' && <Preloader /> }
			{ state.get_type_status === 'success' && (
				<section className={s.section}>
					<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
					<div className="container">
						<div className={s.wrapper}>
						<Title value="Редагувати категорію" />
						<Form
							handler={updateType}>
							<Input
								type='text'
								name='title'
								title='Назва категорії'
								value={state.title}
								onChange={e => dispatch(EditTypeActions.handleChange(e))}
								isRequired />
						</Form>
						</div>
					</div>
				</section>
				) }
		</Fragment>
	)
}

export default EditType