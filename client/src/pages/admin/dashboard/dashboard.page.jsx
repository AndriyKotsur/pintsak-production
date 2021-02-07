import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../../helpers'
import { TilesList } from 'components'
import { TypesList } from 'components'
import { Logout } from '..'
import classNames from 'classnames'
import s from './style.module.scss'

const Dashboard = () => {
	const [tiles, setTiles] = useState([])
	const [types, setTypes] = useState([])

	useEffect(() => {
		const fetchTiles = async () => {
			const allTiles = await HTTP.getAllTiles()
			setTiles(allTiles)
		}
		fetchTiles()
	}, [])

	useEffect(() => {
		const fetchTypes = async () => {
			const allTypes = await HTTP.getTypes()
			setTypes(allTypes)
		}
		fetchTypes()
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
						<TypesList types={types}
							className={s.list} />
					</div>
					<div className={s.tiles}>
						<Link
							to="/admin/add/tile"
							className={classNames('btn-sent', 'btn-orange', s.btn)}>
							Додати новий товар
						</Link>
						<TilesList tiles={tiles}
							className={s.list} />
					</div>
				</div>
			</div>
			<Logout />
		</ section>
	)
}

export default Dashboard