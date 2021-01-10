import React from 'react'
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'

const TypesList = ({ types, className }) => {
	const history = useHistory()
	const onDeleteType = async id => {
		await HTTP.deleteType(id)
		window.location = '/admin/main/type'
	}
	return (
		<>
			<ul className={className}>
				{types && types.map(type => (
					<li key={type.id}>
						<div>
							<span>{type.title}</span>
							<button onClick={() => history.push(`/admin/edit/type/${type.id}`)}>Редагувати</button>
							<button onClick={() => {onDeleteType(type.id)}}>Видалити</button>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default TypesList