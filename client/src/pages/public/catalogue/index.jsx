import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import { Types, Tiles, Preloader } from 'components'
import Sort from './components/sort'
import Pagination from './components/pagination'

import s from './style.module.scss'

const CataloguePage = () => {
	const [page, setPage] = useState(1)
	const [orderBy, setOrderBy] = useState(-1)
	const [sortBy, setSortBy] = useState('')

	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getTiles)
	
	const { typeBy } = useParams()

	const tilesComponents = useMemo(() => {
		const tilesItems = {
			'loading': <Preloader />,
			'success': <Tiles tiles={tiles.tiles} settings={{ public: true }} />,
			'error': 'Помилка запиту даних.',
		}
		
		return tilesItems[tiles.get_tiles_status]
	}, [tiles])
	
	useEffect(() => {
		dispatch(GetTilesActions.getTiles(page, typeBy, sortBy, orderBy))
	}, [page, typeBy, sortBy, orderBy, dispatch])

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())

		return () => dispatch(GetTypesActions.clear())
	}, [dispatch])

	return (
		<section className={s.catalogue}>
			<div className='container'>
				<div className={s.catalogue_wrapper}>
					<div className={s.catalogue_navigation}>
						<Types
							types={types.types}
							settings={{ public: true }} />
					</div>
					<div className={s.catalogue_container}>
						<div className={s.catalogue_sort}>
							<h1 className={s.catalogue_title}>
								{!typeBy && 'Усі товари'}
								{types.types && types.types.map(type => type.url === typeBy && type.title)}
							</h1>
							<Sort
								sortBy={sortBy}
								orderBy={orderBy}
								handleSortBy={setSortBy}
								handleOrderBy={setOrderBy} />
						</div>
						{tiles.get_tiles_status === 'success' && tiles.tiles.length === 0 && 'Немає доданих товарів'}
						{tilesComponents}
						<Pagination
							page={page}
							pages={tiles.pages}
							handlePageBy={setPage} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default CataloguePage
