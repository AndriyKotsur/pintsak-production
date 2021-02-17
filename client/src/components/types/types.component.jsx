import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'
import s from './style.module.scss'

const Types = ({ types, settings  }) => {
	const history = useHistory()
	const onDeleteType = async id => {
		await HTTP.deleteType(id)
		window.location = '/admin/dashboard'
	}

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
									onClick={() => {onDeleteType(type.id)}}
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