import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import { Types, Tiles } from 'components'
import Sort from './components/sort/sort.component'
import Pagination from './components/pagination/pagination.component'

import classNames from 'classnames'
import s from './style.module.scss'

const CataloguePage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getTiles)

	const [page, setPage] = useState(1)
	const [sortBy, setSortBy] = useState('')
	const [orderBy, setOrderBy] = useState(1)

	useEffect(() => {
		dispatch(GetTilesActions.getTiles(page, sortBy, orderBy))
	}, [page, sortBy, orderBy])

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return (
		<div className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.navigation}>
						<Types
							types={types.types}
							settings={{ public: true }}
							styleName={s.hero_navigation} />
					</div>
					<div className={s.catalogue}>
						<div className={s.sort}>
							<h1 className={s.title}>Усі товари</h1>
							<Sort sortBy={sortBy} orderBy={orderBy} handleSortBy={setSortBy} handleOrderBy={setOrderBy} />
						</div>
						<div className={s.products}>
							<Tiles
								tiles={tiles.tiles}
								settings={{ public: true }}/>
						</div>
						<Pagination />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CataloguePage