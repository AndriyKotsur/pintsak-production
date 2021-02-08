import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import { TilesList } from 'components'
import { TypesList } from 'components'
import { Logout } from '..'

import classNames from 'classnames'
import s from './style.module.scss'

const Dashboard = () => {
	const dispatch = useDispatch()
	const tiles = useSelector(tiles => tiles.getTiles)
	const types = useSelector(types => types.getTypes)

	useEffect(() => {
		dispatch(GetTilesActions.getTiles())
		return () => dispatch(GetTilesActions.clear())
	}, [])

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return (
		<section className={s.dashboard}>
			<div className={classNames('container', s.container)}>
				<h1 className={s.title}>Панель керування</h1>
				<div className={s.inner}>
					<div className={s.type}>
						<Link
							to="/admin/add/type"
							className={classNames('btn-sent', 'btn-orange', s.btn)}>
							Додати нову категорію
						</Link>
						<TypesList types={types.types} className={s.list} />
					</div>
					<div className={s.tiles}>
						<Link
							to="/admin/add/tile"
							className={classNames('btn-sent', 'btn-orange', s.btn)}>
							Додати новий товар
						</Link>
						<TilesList tiles={tiles.tiles} className={s.list} />
					</div>
				</div>
			</div>
			<Logout />
		</ section>
	)
}

export default Dashboard