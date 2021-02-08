import React from 'react'
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'
import s from './style.module.scss'

const TypesList = ({ types, className }) => {
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
						<div className={s.wrapper}>
							<p className={s.title}>{type.title}</p>
							<div className={s.action}>
								<button
									onClick={() => history.push(`/admin/edit/type/${type.id}`)}
									className={s.btn_edit}>
										Редагувати
								</button>
								<button
									onClick={() => {onDeleteType(type.id)}}
									className={s.btnDelete}>
										Видалити
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default TypesList