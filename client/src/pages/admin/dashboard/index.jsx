import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import { Button, Title, Tiles, Types } from 'components'
import { Logout } from '..'

import classNames from 'classnames'
import s from './style.module.scss'

const Dashboard = () => {
	const [activeSwitch, setActiveSwitch] = useState('types')

	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getTiles)

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
				<div className={s.dashboard_wrapper}>
					<Logout />
					<Title>
						Панель керування
					</Title>
					<div className={s.dashboard_inner}>
						<div className={s.dashboard_append}>
							<Link to="/admin/type">
								<Button
									type="button"
									background="orange"
									styleName={s.dashboard_appender}>
									Додати категорію
								</Button>
							</Link>
							<Link to="/admin/tile">
								<Button
									type="button"
									background="orange"
									styleName={s.dashboard_appender}>
									Додати товар
								</Button>
							</Link>
						</div>
						<div className={s.dashboard_switch}>
							<button
								type="button"
								className={classNames(s.dashboard_switcher, { [s.active]: activeSwitch === 'types' })}
								onClick={() => setActiveSwitch('types')}>
								Категорії
							</button>
							<button
								type="button"
								className={classNames(s.dashboard_switcher, { [s.active]: activeSwitch === 'tiles' })}
								onClick={() => setActiveSwitch('tiles')}>
								Продукти
							</button>
						</div>
						<div className={s.dashboard_items}>
							{switcher}
						</div>
					</div>
				</div>
			</div>
		</ section>
	)
}

export default Dashboard
