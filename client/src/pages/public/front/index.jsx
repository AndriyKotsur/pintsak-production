import React, {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as GetPopularTilesActions from 'actions/get-popular-tiles.action'
import * as GetTypesActions from 'actions/get-types.action'

import Hero from "./components/hero"
import Popular from "./components/popular"
import Advantages from "./components/advantages"
import Contact from "./components/contact/contact"

const FrontPage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)
	const tiles = useSelector(tiles => tiles.getPopularTiles)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	useEffect(() => {
		dispatch(GetPopularTilesActions.getPopularTiles())
		return () => dispatch(GetPopularTilesActions.clear())
	}, [])

	return (
		<Fragment>
			<Hero types={types} />
			<Popular types={types} tiles={tiles} />
			<Advantages />
			<Contact />
		</Fragment>
	)
}

export default FrontPage
