import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as DeleteTypeActions from 'actions/delete-type.action'
import s from './style.module.scss'

const Types = ({ types, settings  }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.deleteType)

	const deleteType = async id => {
		dispatch(DeleteTypeActions.deleteType(id))
	}

	useEffect(() => {
		if(state.delete_type_status === 'success')
			window.location = '/admin/dashboard'
	}, [state])

	return (
		<>
			<ul className={s.list}>
				{types && types.map(type => (
					<li key={type.id} className={s.item}>
						<Link to="" className={s.link}>{type.title}</Link>
						{
							settings && settings.edit &&
							<div className={s.action}>
								<button
									onClick={() => history.push(`/admin/edit/type/${type.id}`)}
									className={s.edit}>
											Редагувати
								</button>
								<button
									onClick={() => {deleteType(type.id)}}
									className={s.delete}>
											Видалити
								</button>
							</div>
						}
					</li>
				))}
			</ul>
		</>
	)
}

export default Types