import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTilesActions from 'actions/get-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import Hero from './components/hero'
import Popular from './components/popular'
import Advantages from './components/advantages'
import Contact from './components/contact/contact'

const FrontPage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getTiles)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())

		return () => dispatch(GetTypesActions.clear())
	}, [dispatch])

	useEffect(() => {
		dispatch(GetTilesActions.getPopularTiles())

		return () => dispatch(GetTilesActions.clear())
	}, [dispatch])

	return (
		<Fragment>
			<Hero types={types} />
			{tiles.tiles.length > 0 && <Popular types={types} tiles={tiles} />}
			<Advantages />
			<Contact />
		</Fragment>
	)
}

export default FrontPage
