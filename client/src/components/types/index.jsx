import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as DeleteTypeActions from 'actions/delete-type.action'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const Types = ({ types, settings, styleName, handleChange }) => {
	const { typeBy } = useParams()
	const history = useHistory()

	const dispatch = useDispatch()
	const state = useSelector(state => state.deleteType)

	let classes = {
		[s.light]: settings.light,
		[s.mobile]: settings.mobile
	}

	const handleNavigateLink = e => {
		handleChange()

		const currentLink = e.currentTarget.dataset.link
		const currentPath = `/catalogue/${currentLink}`

		history.push(currentPath)
	}

	const handleDeleteType = async id => {
		dispatch(DeleteTypeActions.deleteType(id))
	}

	useEffect(() => {
		if (state.delete_type_status === 'success')
			window.location = '/admin/dashboard'
	}, [state])

	return (
		<div className={classNames(s.types, classes, styleName)}>
			{settings && settings.public && <h2 className={s.types_title}>Види продукції</h2>}
			{settings && settings.edit && <div className={s.types_quantity}>Кількість категорій: <span>{types.length}</span></div>}
			<ul className={s.types_list}>
				{types.length > 0 && types.map(type => (
					<li key={type._id} className={s.types_item}>
						<span data-link={type.url} className={classNames(s.item_link, { [s.active]: type.url === typeBy })} onClick={handleNavigateLink}>
							{type.title}
						</span>
						{ settings && settings.edit &&
							<div className={s.types_control}>
								<button
									onClick={() => history.push(`/admin/type/${type._id}`)}
									className={s.control_edit}>
									Редагувати
                	</button>
								<button
									onClick={() => { handleDeleteType(type._id) }}
									className={s.control_delete}>
									Видалити
                	</button>
							</div> }
					</li>
				))}
			</ul>
			{settings && settings.public &&
				<a href={`${process.env.REACT_APP_API}/v1/catalogue`} className={s.types_download}>
					Каталог
          <Icon name="popular" className={classNames('icon', 'icon-download', s.download_icon)} />
				</a>}
		</div>
	)
}

Types.propTypes = {
	types: PropTypes.any,
	settings: PropTypes.any,
	styleName: PropTypes.string,
	handleChange: PropTypes.func
}

Types.defaultProps = {
	types: [],
	settings: {},
	styleName: '',
	handleChange: () => null
}
export default Types
