import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../../helpers'
import { TilesList } from '../../../components'
import { TypesList } from '../../../components'
import { AdminLogout } from '..'

const AdminDashboard = () => {
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
		<>
			<h1>Панель керування</h1>
			<div>
				<div>
					<Link to="/admin/add/type">Додати категорію</Link>
				</div>
				<TypesList types={types} />
			</div>
			<div>
				<div>
					<Link to="/admin/add/tile">Додати товар</Link>
				</div>
				<TilesList tiles={tiles} />
			</div>
			<AdminLogout />
		</>
	)
}

export default AdminDashboard