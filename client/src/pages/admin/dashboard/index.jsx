import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import { Title, Tiles, Types } from 'components'
import { Logout } from '..'

import classNames from 'classnames'
import s from './style.module.scss'

const Dashboard = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getTiles)
	const [activeSwitch, setActiveSwitch] = useState('types')

	const switcher = useMemo(() => {
		const switchers = {
			'types': <Types types={types.types} settings={{ edit: true }} />,
			'tiles': <Tiles tiles={tiles.tiles} settings={{ edit: true }} />,
		}

		return switchers[activeSwitch]
	}, [types, activeSwitch, tiles])

	useEffect(() => {
		dispatch(GetTilesActions.getTiles())

		return () => dispatch(GetTilesActions.clear())
	}, [dispatch])

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())

		return () => dispatch(GetTypesActions.clear())
	}, [dispatch])

	return (
		<section className={s.dashboard}>
			<div className='container'>
				<div className={s.wrapper}>
					<Logout />
					<Title value="Панель керування" />
					<div className={s.inner}>
						<div className={s.append}>
							<Link
								to="/admin/type"
								className={classNames('btn-sent', 'btn-orange', s.appender)}>
								Додати категорію
							</Link>
							<Link
								to="/admin/tile"
								className={classNames('btn-sent', 'btn-orange', s.appender)}>
								Додати товар
							</Link>
						</div>
						<div className={s.switch}>
							<button
								onClick={() => setActiveSwitch('types')}
								className={classNames(s.switcher, { [s.active]: activeSwitch === 'types' })}>
								Категорії
							</button>
							<button
								onClick={() => setActiveSwitch('tiles')}
								className={classNames(s.switcher, { [s.active]: activeSwitch === 'tiles' })}>
								Продукти
							</button>
						</div>
						<div className={s.items}>
							{switcher}
						</div>
					</div>
				</div>
			</div>
		</ section>
	)
}

export default Dashboard
