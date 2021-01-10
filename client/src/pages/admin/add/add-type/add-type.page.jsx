import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTypeActions from 'actions/add-type.action'
import Input from 'components/input/input.component'
import classNames from 'classnames'
import s from './style.module.scss'

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
		<section className={s.addType}>
			<div className={classNames('container', s.container)}>
				<div className={s.inner}>
					<h2 className={s.title}>
            Додати категорію
					</h2>
					<form onSubmit={e => addType(e)} className="form contact-us-form">
						<Input
							type='text'
							name='title'
							value={state.title}
							title='Назва категорії'
							onChange={e => dispatch(AddTypeActions.handleChange(e))}
							isRequired />
						<Input
							type='text'
							name='url'
							title='Назва категорії (англ.)'
							value={state.url}
							onChange={e => dispatch(AddTypeActions.handleChange(e))}
							isRequired/>
						<p className={s.required}>* обов’язкові поля</p>
						<button className={classNames('btn-sent', 'btn-orange')}>Пітвердити</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default AddType