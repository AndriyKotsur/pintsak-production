import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as DeleteTypeActions from 'actions/delete-type.action'
import { Icon } from 'components'
import s from './style.module.scss'
import classNames from 'classnames'

const Types = ({ types, settings, styleName  }) => {
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
		<div className={classNames(styleName, {[s.light]: settings.light})}>
			{
				settings && settings.public &&
				<h2 className={s.title}>Види продукції</h2>
			}
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
			{
				settings && settings.public &&
				<a href="http://localhost:5000/download-catalogue" className={s.download}>Каталог
					<Icon name="popular" className={classNames('icon', 'icon-download', s.icon)} />
				</a>
			}
		</div>
	)
}

export default Types